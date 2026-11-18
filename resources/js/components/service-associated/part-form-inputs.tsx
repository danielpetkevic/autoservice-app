import FormField from '@/components/forms/form-field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Part } from '@/types';

interface Props {
    errors: {
        name?: string;
        description?: string;
        sku?: string;
        price?: string;
        stock_quantity?: string;
    };
    part?: Pick<
        Part,
        'name' | 'description' | 'sku' | 'price' | 'stock_quantity'
    >;
}

export default function PartFormInputs({ errors, part }: Props) {
    return (
        <>
            <FormField
                name="name"
                label="Part Name"
                error={errors.name}
                required
            >
                <Input
                    id="name"
                    name="name"
                    placeholder="Engine Repair"
                    maxLength={100}
                    required
                    autoFocus
                    defaultValue={part?.name ?? ''}
                    aria-invalid={!!errors.name}
                />
            </FormField>

            <FormField name="sku" label="Part SKU" error={errors.sku} required>
                <Input
                    id="sku"
                    name="sku"
                    placeholder="PART-NAME-52755"
                    maxLength={100}
                    required
                    autoFocus
                    defaultValue={part?.sku ?? ''}
                    aria-invalid={!!errors.sku}
                />
            </FormField>

            <FormField
                name="description"
                label="Description"
                error={errors.description}
                description="Optional. Describe the part."
            >
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the part..."
                    rows={4}
                    defaultValue={part?.description ?? ''}
                    aria-invalid={!!errors.description}
                />
            </FormField>

            <FormField name="price" label="Price" error={errors.price} required>
                <Input
                    id="price"
                    name="price"
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    required
                    autoFocus
                    defaultValue={part?.price ?? ''}
                    aria-invalid={!!errors.price}
                />
            </FormField>
        </>
    );
}
