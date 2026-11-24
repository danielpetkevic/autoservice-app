import FormCard from '@/components/forms/form-card';
import CategoryFormInputs from '@/components/service-associated/form-inputs/category-form-inputs';
import { index, update } from '@/routes/service_categories';
import { Form, Head } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import type { ServiceCategory } from '@/types';
import { useTranslation } from 'react-i18next';

interface Props {
    category: Pick<ServiceCategory, 'id' | 'name' | 'description'>;
}

export default function ServiceCategoryEdit({ category }: Props) {
    const { t } = useTranslation();
    return (
        <>
            <Head title={t('forms.edit_category')} />

            <Form {...update.form(category.id)}>
                {({ processing, errors }) => (
                    <FormCard
                        title={t('forms.edit_category')}
                        description={t('forms.update_category', {
                            name: category.name,
                        })}
                        icon={<Pencil className="size-6" />}
                        backUrl={index.url()}
                        backLabel={t('forms.back_to_categories')}
                        submitLabel={t('forms.save_changes')}
                        processing={processing}
                    >
                        <CategoryFormInputs
                            errors={errors}
                            category={category}
                        />
                    </FormCard>
                )}
            </Form>
        </>
    );
}
