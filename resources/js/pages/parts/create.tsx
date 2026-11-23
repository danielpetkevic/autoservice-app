import FormCard from '@/components/forms/form-card';
import PartFormInputs from '@/components/service-associated/part-form-inputs';
import { index, store } from '@/routes/parts';
import { Form, Head } from '@inertiajs/react';
import { Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PartCreate() {
    const { t } = useTranslation();
    return (
        <>
            <Head title={t('forms.create_part')} />

            <Form {...store.form()}>
                {({ processing, errors }) => (
                    <FormCard
                        title={t('forms.create_part')}
                        description={t('forms.part_description')}
                        icon={<Package className="size-6" />}
                        backUrl={index.url()}
                        backLabel={t('forms.back_to_parts')}
                        submitLabel={t('forms.create_part_button')}
                        processing={processing}
                    >
                        <PartFormInputs errors={errors} />
                    </FormCard>
                )}
            </Form>
        </>
    );
}
