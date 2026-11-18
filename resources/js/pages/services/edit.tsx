import FormCard from '@/components/forms/form-card';
import ServiceFormInputs from '@/components/service-associated/service-form-inputs';
import type { ServiceCategory, Service } from '@/types';
import { index, store } from '@/routes/services';
import { Form, Head } from '@inertiajs/react';
import { Wrench } from 'lucide-react';

interface Props {
    service: Service;
    categories: Pick<ServiceCategory, 'id' | 'name'>[];
}

export default function ServiceEdit({ service, categories }: Props) {
    return (
        <>
            <Head title="Edit Service" />

            <Form {...store.form()}>
                {({ processing, errors }) => (
                    <FormCard
                        title="Edit Service"
                        description="Update the details of your service."
                        icon={<Wrench className="size-6" />}
                        backUrl={index.url()}
                        backLabel="Back to services"
                        submitLabel="Update Service"
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
