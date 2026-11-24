import FormCard from '@/components/forms/form-card';
import CategoryFormInputs from '@/components/service-associated/form-inputs/category-form-inputs';
import { index, store } from '@/routes/service_categories';
import { Form, Head } from '@inertiajs/react';
import { FolderPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ServiceCategoryCreate() {
    const { t } = useTranslation();
    return (
        <>
            <Head title={t('forms.create_category')} />

            <Form {...store.form()}>
                {({ processing, errors }) => (
                    <FormCard
                        title={t('forms.create_category')}
                        description={t('forms.category_description')}
                        icon={<FolderPlus className="size-6" />}
                        backUrl={index.url()}
                        backLabel={t('forms.back_to_categories')}
                        submitLabel={t('forms.create_category_button')}
                        processing={processing}
                    >
                        <CategoryFormInputs errors={errors} />
                    </FormCard>
                )}
            </Form>
        </>
    );
}
