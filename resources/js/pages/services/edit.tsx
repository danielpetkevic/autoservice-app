import FormCard from '@/components/forms/form-card';
import ServiceFormInputs from '@/components/service-associated/form-inputs/service-form-inputs';
import type { ServiceCategory, Service } from '@/types';
import { index, store } from '@/routes/services';
import { Form, Head } from '@inertiajs/react';
import { Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
    service: Service;
    categories: Pick<ServiceCategory, 'id' | 'name'>[];
}

export default function ServiceEdit({ service, categories }: Props) {
    const { t } = useTranslation();
    return (
        <>
            <Head title={t('forms.edit_service')} />

            <Form {...store.form()}>
                {({ processing, errors }) => (
                    <FormCard
                        title={t('forms.edit_service')}
                        description={t('forms.edit_service_description')}
                        icon={<Wrench className="size-6" />}
                        backUrl={index.url()}
                        backLabel={t('forms.back_to_services')}
                        submitLabel={t('forms.update_service_button')}
                        processing={processing}
                    >
                        <ServiceFormInputs
                            errors={errors}
                            categories={categories}
                            service={service}
                        />
                    </FormCard>
                )}
            </Form>
        </>
    );
}
