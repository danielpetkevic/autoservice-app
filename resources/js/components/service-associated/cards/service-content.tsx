import {
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Clock3, Wallet, Wrench } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Service } from '@/types/service';

interface Props {
    item: Service;
    canUpdate: boolean;
}

export default function ServiceContent({ item, canUpdate }: Props) {
    const { t, i18n } = useTranslation();
    const [isActive, setIsActive] = useState(item.is_active);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        setIsActive(item.is_active);
    }, [item.is_active]);

    const handleToggle = (checked: boolean) => {
        if (!canUpdate || isUpdating) return;

        setIsUpdating(true);

        router.patch(
            `/services/${item.id}/toggle-active`,
            { is_active: checked },
            {
                preserveScroll: true,
                onSuccess: () => setIsActive(checked),
                onFinish: () => setIsUpdating(false),
            },
        );
    };

    const formatPrice = (price: number | string) =>
        new Intl.NumberFormat(i18n.language, {
            style: 'currency',
            currency: 'EUR',
        }).format(Number(price));

    return (
        <>
            <CardHeader className="space-y-4 p-5">
                <div className="flex items-start justify-between">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Wrench className="size-5" />
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                            {isActive
                                ? t('common.active')
                                : t('common.inactive')}
                        </span>

                        {canUpdate && (
                            <Switch
                                checked={isActive}
                                onCheckedChange={handleToggle}
                                disabled={isUpdating}
                            />
                        )}
                    </div>
                </div>

                <div className="space-y-1.5">
                    <p className="text-xs text-muted-foreground">
                        {item.service_category?.name ??
                            t('inventory.no_category')}
                    </p>

                    <CardTitle className="text-lg">{item.name}</CardTitle>

                    <CardDescription className="line-clamp-3 min-h-10">
                        {item.description || t('inventory.no_description')}
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="mt-auto px-5 pb-5">
                <div className="grid grid-cols-2 gap-4 rounded-xl bg-muted/40 p-4">
                    <div className="flex items-center gap-2">
                        <Wallet className="size-4 text-muted-foreground" />

                        <div>
                            <p className="text-xs text-muted-foreground">
                                {t('inventory.base_price')}
                            </p>
                            <p className="font-semibold">
                                {formatPrice(item.price)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock3 className="size-4 text-muted-foreground" />

                        <div>
                            <p className="text-xs text-muted-foreground">
                                {t('inventory.duration')}
                            </p>
                            <p className="font-semibold">
                                {item.duration != null
                                    ? `${item.duration} min`
                                    : '—'}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </>
    );
}
