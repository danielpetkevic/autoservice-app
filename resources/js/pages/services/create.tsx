import FormCard from '@/components/forms/form-card';
import ServiceFormInputs from '@/components/service-associated/form-inputs/service-form-inputs';
import type { ServiceCategory } from '@/types';
import { index, store } from '@/routes/services';
import { Form, Head } from '@inertiajs/react';
import { Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
    categories: Pick<ServiceCategory, 'id' | 'name'>[];
}

export default function ServiceCreate({ categories }: Props) {
    const { t } = useTranslation();
    return (
        <>
            <Head title={t('forms.create_service')} />

            <Form {...store.form()}>
                {({ processing, errors }) => (
                    <FormCard
                        title={t('forms.create_service')}
                        description={t('forms.service_description')}
                        icon={<Wrench className="size-6" />}
                        backUrl={index.url()}
                        backLabel={t('forms.back_to_services')}
                        submitLabel={t('forms.create_service_button')}
                        processing={processing}
                    >
                        <ServiceFormInputs
                            errors={errors}
                            categories={categories}
                        />
                    </FormCard>
                )}
            </Form>
        </>
    );
}
