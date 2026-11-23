import FormField from '@/components/forms/form-field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Part } from '@/types';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
    return (
        <>
            <FormField
                name="name"
                label={t('fields.part_name')}
                error={errors.name}
                required
            >
                <Input
                    id="name"
                    name="name"
                    placeholder={t('placeholders.category')}
                    maxLength={100}
                    required
                    autoFocus
                    defaultValue={part?.name ?? ''}
                    aria-invalid={!!errors.name}
                />
            </FormField>

            <FormField
                name="sku"
                label={t('fields.part_sku')}
                error={errors.sku}
                required
            >
                <Input
                    id="sku"
                    name="sku"
                    placeholder={t('placeholders.part_sku')}
                    maxLength={100}
                    required
                    autoFocus
                    defaultValue={part?.sku ?? ''}
                    aria-invalid={!!errors.sku}
                />
            </FormField>

            <FormField
                name="description"
                label={t('fields.description')}
                error={errors.description}
                description={t('part.description_help')}
            >
                <Textarea
                    id="description"
                    name="description"
                    placeholder={t('placeholders.description_part')}
                    rows={4}
                    defaultValue={part?.description ?? ''}
                    aria-invalid={!!errors.description}
                />
            </FormField>

            <FormField
                name="price"
                label={t('fields.price')}
                error={errors.price}
                required
            >
                <Input
                    id="price"
                    name="price"
                    placeholder={t('placeholders.price')}
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
