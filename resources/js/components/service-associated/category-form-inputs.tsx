import FormField from '@/components/forms/form-field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import type { ServiceCategory } from '@/types';
import { useTranslation } from 'react-i18next';

interface Props {
    errors: {
        name?: string;
        description?: string;
    };
    category?: Pick<ServiceCategory, 'name' | 'description'>;
}

export default function CategoryFormInputs({ errors, category }: Props) {
    const { t } = useTranslation();
    return (
        <>
            <FormField
                name="name"
                label={t('fields.category_name')}
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
                    defaultValue={category?.name ?? ''}
                    aria-invalid={!!errors.name}
                />
            </FormField>

            <FormField
                name="description"
                label={t('fields.description')}
                error={errors.description}
                description={t('category.description_help')}
            >
                <Textarea
                    id="description"
                    name="description"
                    placeholder={t('placeholders.description_category')}
                    rows={4}
                    defaultValue={category?.description ?? ''}
                    aria-invalid={!!errors.description}
                />
            </FormField>
        </>
    );
}
