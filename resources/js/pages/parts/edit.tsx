import FormCard from '@/components/forms/form-card';
import PartFormInputs from '@/components/service-associated/part-form-inputs';
import { index, update } from '@/routes/parts';
import { Form, Head } from '@inertiajs/react';
import { Package } from 'lucide-react';
import type { Part } from '@/types';

interface Props {
    part: Pick<
        Part,
        'id' | 'name' | 'description' | 'sku' | 'price' | 'stock_quantity'
    >;
}

export default function PartEdit({ part }: Props) {
    return (
        <>
            <Head title="Edit Part" />

            <Form {...update.form(part.id)}>
                {({ processing, errors }) => (
                    <FormCard
                        title="Edit Part"
                        description="Change the details of this part."
                        icon={<Package className="size-6" />}
                        backUrl={index.url()}
                        backLabel="Back to parts"
                        submitLabel="Submit Changes"
                        processing={processing}
                    >
                        <PartFormInputs errors={errors} part={part} />
                    </FormCard>
                )}
            </Form>
        </>
    );
}
