import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';

interface Props {
    errors: {
        name?: string;
        description?: string;
    };
    category?: {
        name: string;
        description: string | null;
    };
}

export default function ServiceCategoryFormInputs({ errors, category }: Props) {
    return (
        <>
            <div className="grid gap-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                    id="name"
                    name="name"
                    placeholder="Engine Repair"
                    maxLength={255}
                    required
                    autoFocus
                    defaultValue={category?.name}
                />
                <InputError message={errors.name} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the services included in this category..."
                    rows={4}
                    defaultValue={category?.description ?? ''}
                />
                <p className="text-xs text-muted-foreground">
                    Optional. Provide a brief description to help users
                    understand this category.
                </p>
                <InputError message={errors.description} />
            </div>
        </>
    );
}
