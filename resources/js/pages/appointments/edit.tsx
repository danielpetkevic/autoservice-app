import FormCard from '@/components/forms/form-card';
import AppointmentFormInputs from '@/components/service-associated/form-inputs/appointment-form-inputs';
import type { Appointment, Service, Vehicle } from '@/types';
import { index, update } from '@/routes/appointments';
import { Form, Head } from '@inertiajs/react';
import { CalendarDays } from 'lucide-react';

interface Props {
    appointment: Appointment;
    vehicles: Pick<Vehicle, 'id' | 'brand' | 'model' | 'license_plate'>[];
    services: Pick<Service, 'id' | 'name'>[];
    canManage: boolean;
}

export default function AppointmentEdit({
    appointment,
    vehicles,
    services,
    canManage,
}: Props) {
    return (
        <>
            <Head title="Edit Appointment" />

            <Form {...update.form(appointment.id)}>
                {({ processing, errors }) => (
                    <FormCard
                        title="Edit Appointment"
                        description="Update appointment details and selected services."
                        icon={<CalendarDays className="size-6" />}
                        backUrl={index.url()}
                        backLabel="Back to appointments"
                        submitLabel="Save Changes"
                        processing={processing}
                    >
                        <AppointmentFormInputs
                            key={appointment.id}
                            appointment={appointment}
                            vehicles={vehicles}
                            services={services}
                            errors={errors}
                            canManage={canManage}
                        />
                    </FormCard>
                )}
            </Form>
        </>
    );
}
