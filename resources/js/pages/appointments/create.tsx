import FormCard from '@/components/forms/form-card';
import AppointmentFormInputs from '@/components/service-associated/form-inputs/appointment-form-inputs';
import { index, store } from '@/routes/appointments';
import { Service, Vehicle } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
    vehicles: Pick<Vehicle, 'id' | 'brand' | 'model' | 'license_plate'>[];
    services: Pick<Service, 'id' | 'name'>[];
    canManage?: boolean;
}

export default function AppointmentCreate({
    vehicles,
    services,
    canManage,
}: Props) {
    const { t } = useTranslation();
    return (
        <>
            <Head title={t('forms.create_appointment')} />

            <Form {...store.form()}>
                {({ processing, errors }) => (
                    <FormCard
                        title={t('forms.create_appointment')}
                        description={t('forms.create_appointment_description')}
                        icon={<Calendar className="size-6" />}
                        backUrl={index.url()}
                        backLabel={t('forms.back_to_appointments')}
                        submitLabel={t('forms.create_appointment_button')}
                        processing={processing}
                    >
                        <AppointmentFormInputs
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
