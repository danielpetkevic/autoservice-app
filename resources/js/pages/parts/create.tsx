import FormCard from '@/components/forms/form-card';
import PartFormInputs from '@/components/service-associated/part-form-inputs';
import { index, store } from '@/routes/parts';
import { Form, Head } from '@inertiajs/react';
import { Package } from 'lucide-react';

export default function PartCreate() {
    return (
        <>
            <Head title="Create Part" />

            <Form {...store.form()}>
                {({ processing, errors }) => (
                    <FormCard
                        title="Create Part"
                        description="Add a new part to your AutoService inventory."
                        icon={<Package className="size-6" />}
                        backUrl={index.url()}
                        backLabel="Back to parts"
                        submitLabel="Create Part"
                        processing={processing}
                    >
                        <PartFormInputs errors={errors} />
                    </FormCard>
                )}
            </Form>
        </>
    );
}
