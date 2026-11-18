import FormCard from '@/components/forms/form-card';
import CategoryFormInputs from '@/components/service-associated/category-form-inputs';
import { index, update } from '@/routes/service_categories';
import { Form, Head } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import type { ServiceCategory } from '@/types';

interface Props {
    category: Pick<ServiceCategory, 'id' | 'name' | 'description'>;
}

export default function ServiceCategoryEdit({ category }: Props) {
    return (
        <>
            <Head title={`Edit ${category.name}`} />

            <Form {...update.form(category.id)}>
                {({ processing, errors }) => (
                    <FormCard
                        title="Edit Service Category"
                        description={`Update the details of ${category.name}.`}
                        icon={<Pencil className="size-6" />}
                        backUrl={index.url()}
                        backLabel="Back to categories"
                        submitLabel="Save Changes"
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
