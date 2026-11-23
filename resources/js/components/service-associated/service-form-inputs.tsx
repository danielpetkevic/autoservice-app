import FormField from '@/components/forms/form-field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import type { ServiceFormData } from '@/types/service';
import type { ServiceCategory } from '@/types/service-category';
import { Clock3, Euro } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    service?: ServiceFormData;
    categories: Pick<ServiceCategory, 'id' | 'name'>[];
    errors: {
        name?: string;
        description?: string;
        category_id?: string;
        price?: string;
        duration?: string;
        is_active?: string;
    };
}

export default function ServiceFormInputs({
    errors,
    service,
    categories,
}: Props) {
    const { t } = useTranslation();
    const [categoryId, setCategoryId] = useState(
        service?.category_id?.toString() ?? 'none',
    );

    const [isActive, setIsActive] = useState(service?.is_active ?? true);

    return (
        <>
            <FormField
                name="name"
                label={t('fields.service_name')}
                error={errors.name}
                required
            >
                <Input
                    id="name"
                    name="name"
                    placeholder={t('placeholders.service')}
                    maxLength={150}
                    required
                    autoFocus
                    defaultValue={service?.name ?? ''}
                    aria-invalid={!!errors.name}
                />
            </FormField>

            <FormField
                name="category_id"
                label={t('fields.service_category')}
                error={errors.category_id}
                description={t('service.category_help')}
            >
                <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger
                        id="category_id"
                        className="w-full"
                        aria-invalid={!!errors.category_id}
                    >
                        <SelectValue placeholder="-" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="none">-</SelectItem>

                        {categories.map((category) => (
                            <SelectItem
                                key={category.id}
                                value={String(category.id)}
                            >
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <input
                    type="hidden"
                    name="category_id"
                    value={categoryId === 'none' ? '' : categoryId}
                />
            </FormField>

            <FormField
                name="description"
                label={t('fields.description')}
                error={errors.description}
                description={t('service.description_help')}
            >
                <Textarea
                    id="description"
                    name="description"
                    placeholder={t('placeholders.description_service')}
                    rows={4}
                    defaultValue={service?.description ?? ''}
                    aria-invalid={!!errors.description}
                />
            </FormField>

            <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                    name="price"
                    label={t('fields.base_price')}
                    error={errors.price}
                    required
                >
                    <div className="relative">
                        <Euro className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            id="price"
                            name="price"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder={t('placeholders.service_price')}
                            className="pl-9"
                            required
                            defaultValue={service?.price ?? ''}
                            aria-invalid={!!errors.price}
                        />
                    </div>
                </FormField>

                <FormField
                    name="duration"
                    label={t('fields.duration')}
                    error={errors.duration}
                >
                    <div className="relative">
                        <Clock3 className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            id="duration"
                            name="duration"
                            type="number"
                            min="1"
                            step="1"
                            placeholder={t('placeholders.duration')}
                            className="pl-9"
                            defaultValue={service?.duration ?? ''}
                            aria-invalid={!!errors.duration}
                        />
                    </div>
                </FormField>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-xl border p-4">
                <div className="space-y-1">
                    <label htmlFor="is_active" className="text-sm font-medium">
                        {t('fields.active_service')}
                    </label>

                    <p className="text-sm text-muted-foreground">
                        {t('service.active_help')}
                    </p>
                </div>

                <Switch
                    id="is_active"
                    checked={isActive}
                    onCheckedChange={setIsActive}
                    aria-invalid={!!errors.is_active}
                />

                <input
                    type="hidden"
                    name="is_active"
                    value={isActive ? '1' : '0'}
                />
            </div>

            {errors.is_active && (
                <p className="text-sm text-destructive">{errors.is_active}</p>
            )}
        </>
    );
}
