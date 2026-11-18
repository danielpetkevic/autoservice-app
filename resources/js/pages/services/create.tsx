import FormCard from '@/components/forms/form-card';
import ServiceFormInputs from '@/components/service-associated/service-form-inputs';
import type { ServiceCategory } from '@/types';
import { index, store } from '@/routes/services';
import { Form, Head } from '@inertiajs/react';
import { Wrench } from 'lucide-react';

interface Props {
    categories: Pick<ServiceCategory, 'id' | 'name'>[];
}

export default function ServiceCreate({ categories }: Props) {
    return (
        <>
            <Head title="Create Service" />

            <Form {...store.form()}>
                {({ processing, errors }) => (
                    <FormCard
                        title="Create Service"
                        description="Add a new service to your AutoService catalog."
                        icon={<Wrench className="size-6" />}
                        backUrl={index.url()}
                        backLabel="Back to services"
                        submitLabel="Create Service"
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
