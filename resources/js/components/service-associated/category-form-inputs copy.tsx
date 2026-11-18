import FormField from '@/components/forms/form-field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import type { ServiceCategory } from '@/types';

interface Props {
    errors: {
        name?: string;
        description?: string;
    };
    category?: Pick<ServiceCategory, 'name' | 'description'>;
}

export default function CategoryFormInputs({ errors, category }: Props) {
    return (
        <>
            <FormField
                name="name"
                label="Category Name"
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
                    defaultValue={category?.name ?? ''}
                    aria-invalid={!!errors.name}
                />
            </FormField>

            <FormField
                name="description"
                label="Description"
                error={errors.description}
                description="Optional. Describe the services included in this category."
            >
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the category..."
                    rows={4}
                    defaultValue={category?.description ?? ''}
                    aria-invalid={!!errors.description}
                />
            </FormField>
        </>
    );
}
