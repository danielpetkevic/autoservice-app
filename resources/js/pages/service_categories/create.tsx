import FormCard from '@/components/forms/form-card';
import CategoryFormInputs from '@/components/service-associated/category-form-inputs';
import { index, store } from '@/routes/service_categories';
import { Form, Head } from '@inertiajs/react';
import { FolderPlus } from 'lucide-react';

export default function ServiceCategoryCreate() {
    return (
        <>
            <Head title="Create Service Category" />

            <Form {...store.form()}>
                {({ processing, errors }) => (
                    <FormCard
                        title="Create Service Category"
                        description="Organize your auto repair services into categories."
                        icon={<FolderPlus className="size-6" />}
                        backUrl={index.url()}
                        backLabel="Back to categories"
                        submitLabel="Create Category"
                        processing={processing}
                    >
                        <CategoryFormInputs errors={errors} />
                    </FormCard>
                )}
            </Form>
        </>
    );
}
