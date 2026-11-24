import FormField from '@/components/forms/form-field';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Appointment, Service, Vehicle } from '@/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DateTimePicker from '@/components/forms/date-time-picker';

interface Props {
    errors: {
        vehicle_id?: string;
        appointment_at?: string;
        services?: string;
        status?: string;
        notes?: string;
        [key: string]: string | undefined;
    };
    appointment?: Appointment;
    vehicles: Pick<Vehicle, 'id' | 'brand' | 'model' | 'license_plate'>[];
    services: Pick<Service, 'id' | 'name'>[];
    canManage?: boolean;
}

export default function AppointmentFormInputs({
    errors,
    appointment,
    vehicles,
    services,
    canManage,
}: Props) {
    const { t } = useTranslation();

    const [vehicleId, setVehicleId] = useState(
        appointment?.vehicle?.id.toString() ?? '',
    );

    const [status, setStatus] = useState(appointment?.status ?? '');

    const [selectedServices, setSelectedServices] = useState<number[]>(
        appointment?.services.map((service) => service.id) ?? [],
    );

    const toggleService = (serviceId: number, checked: boolean) => {
        setSelectedServices((previous) =>
            checked
                ? [...previous, serviceId]
                : previous.filter((id) => id !== serviceId),
        );
    };

    return (
        <>
            <FormField
                name="vehicle_id"
                label={t('fields.vehicle')}
                error={errors.vehicle_id}
                required
            >
                <Select value={vehicleId} onValueChange={setVehicleId}>
                    <SelectTrigger id="vehicle_id" className="w-full">
                        <SelectValue
                            placeholder={t('placeholders.select_vehicle')}
                        />
                    </SelectTrigger>

                    <SelectContent>
                        {vehicles.map((vehicle) => (
                            <SelectItem
                                key={vehicle.id}
                                value={String(vehicle.id)}
                            >
                                {vehicle.brand} {vehicle.model} (
                                {vehicle.license_plate})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <input type="hidden" name="vehicle_id" value={vehicleId} />
            </FormField>

            <FormField
                name="appointment_at"
                label={t('fields.appointment_at')}
                error={errors.appointment_at}
                required
            >
                <DateTimePicker
                    name="appointment_at"
                    defaultValue={appointment?.appointment_at}
                />
            </FormField>

            <FormField
                name="services"
                label={t('navigation.services')}
                error={errors.services}
                description={t('fields.appointment_select_services_help')}
            >
                <div className="grid gap-3 rounded-xl border p-4">
                    {services.map((service) => (
                        <label
                            key={service.id}
                            htmlFor={`service-${service.id}`}
                            className="flex cursor-pointer items-center gap-3"
                        >
                            <Checkbox
                                id={`service-${service.id}`}
                                checked={selectedServices.includes(service.id)}
                                onCheckedChange={(checked) =>
                                    toggleService(service.id, checked === true)
                                }
                            />
                            <span className="text-sm">{service.name}</span>
                        </label>
                    ))}
                </div>

                {selectedServices.map((id) => (
                    <input
                        key={id}
                        type="hidden"
                        name="services[]"
                        value={id}
                    />
                ))}
            </FormField>

            {canManage && (
                <FormField
                    name="status"
                    label={t('fields.status')}
                    error={errors.status}
                    required
                >
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger id="status" className="w-full">
                            <SelectValue
                                placeholder={t('placeholders.select_status')}
                            />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="scheduled">
                                {t('appointment.scheduled')}
                            </SelectItem>
                            <SelectItem value="completed">
                                {t('appointment.completed')}
                            </SelectItem>
                            <SelectItem value="cancelled">
                                {t('appointment.cancelled')}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <input type="hidden" name="status" value={status} />
                </FormField>
            )}

            <FormField
                name="notes"
                label={t('fields.notes')}
                error={errors.notes}
            >
                <Textarea
                    id="notes"
                    name="notes"
                    placeholder={t('placeholders.appointment_notes')}
                    rows={4}
                    defaultValue={appointment?.notes ?? ''}
                    aria-invalid={!!errors.notes}
                />
            </FormField>
        </>
    );
}
