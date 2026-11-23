import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, router } from '@inertiajs/react';
import {
    Clock3,
    FolderOpen,
    Pencil,
    Trash2,
    Wallet,
    Wrench,
    Package,
    Minus,
    Plus,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { useTranslation } from 'react-i18next';

interface Item {
    id: number;
    name: string;
    description: string | null;
    service_category?: {
        id: number;
        name: string;
    } | null;
    price?: number | string | null;
    duration?: number | null;
    is_active?: boolean | null;
    sku?: string;
    stock_quantity?: number;
}

interface Props {
    item: Item;
    editUrl: string;
    deleteUrl: string;
    type: string;
    can?: {
        update: boolean;
        delete: boolean;
    };
}

const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
});

export default function ItemCard({
    item,
    editUrl,
    deleteUrl,
    type,
    can,
}: Props) {
    const { t } = useTranslation();
    //additional logic for service and part items

    const isService = type === 'service';
    const isPart = type === 'part';

    const stock = item.stock_quantity ?? 0;

    const stockStatus =
        stock === 0
            ? t('inventory.out_of_stock')
            : stock <= 5
              ? t('inventory.low_stock')
              : t('inventory.in_stock');

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const remaining = minutes % 60;

        if (hours === 0) return `${remaining} min`;
        if (remaining === 0) return `${hours} hr`;

        return `${hours} hr ${remaining} min`;
    };

    const handleDelete = () => {
        if (window.confirm(t('common.delete_confirm', { name: item.name }))) {
            router.delete(deleteUrl, {
                preserveScroll: true,
            });
        }
    };

    const [isActive, setIsActive] = useState(item.is_active ?? false);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleToggle = (checked: boolean) => {
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

    const [stockInput, setStockInput] = useState(
        String(item.stock_quantity ?? 0),
    );

    const [stockUpdating, setStockUpdating] = useState(false);

    // Synchronize the input after Inertia refreshes the item.
    useEffect(() => {
        setStockInput(String(item.stock_quantity ?? 0));
    }, [item.stock_quantity]);

    const handleStockBlur = () => {
        if (!can?.update || stockUpdating) return;

        const original = item.stock_quantity ?? 0;
        const value = stockInput.trim();
        const newStock = Number(value);

        // Reject empty, negative, decimal, or invalid values.
        if (value === '' || !Number.isSafeInteger(newStock) || newStock < 0) {
            setStockInput(String(original));
            return;
        }

        // Don't submit if the value hasn't changed.
        if (newStock === original) return;

        setStockUpdating(true);

        router.patch(
            `/parts/${item.id}/stock`,
            { stock_quantity: newStock },
            {
                preserveScroll: true,
                onError: () => setStockInput(String(original)),
                onFinish: () => setStockUpdating(false),
            },
        );
    };

    const handleStockChange = (action: 'increment' | 'decrement') => {
        setStockUpdating(true);

        router.patch(
            `/parts/${item.id}/stock`,
            { action },
            {
                preserveScroll: true,
                onFinish: () => setStockUpdating(false),
            },
        );
    };

    return (
        <Card
            className={`flex h-full flex-col gap-0 overflow-hidden py-0 transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-muted/25 hover:shadow-md ${isService && !isActive ? 'opacity-70' : ''}`}
        >
            <CardHeader className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        {isService ? (
                            <Wrench className="size-5" />
                        ) : isPart ? (
                            <Package className="size-5" />
                        ) : (
                            <FolderOpen className="size-5" />
                        )}
                    </div>

                    {isService && item.is_active != null && can?.update && (
                        <div className="flex items-center gap-2">
                            <span
                                className={`text-xs font-medium ${
                                    isActive
                                        ? 'text-primary'
                                        : 'text-muted-foreground'
                                }`}
                            >
                                {isActive
                                    ? t('common.active')
                                    : t('common.inactive')}
                            </span>

                            <Switch
                                checked={isActive}
                                onCheckedChange={handleToggle}
                                disabled={isUpdating || !can?.update}
                                aria-label={`${isActive ? t('inventory.deactivate') : t('inventory.activate')} ${item.name}`}
                                className="cursor-pointer"
                            />
                        </div>
                    )}
                    {isPart && (
                        <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                stock === 0
                                    ? 'bg-destructive/10 text-destructive'
                                    : stock <= 5
                                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            }`}
                        >
                            {stockStatus}
                        </span>
                    )}
                </div>

                <div className="space-y-1.5">
                    {isService && (
                        <p className="text-xs font-medium text-muted-foreground">
                            {item.service_category?.name ??
                                t('inventory.no_category')}
                        </p>
                    )}

                    {isPart && (
                        <p className="text-xs font-medium text-muted-foreground">
                            SKU: {item.sku}
                        </p>
                    )}

                    <CardTitle className="text-lg leading-tight">
                        {item.name}
                    </CardTitle>

                    <CardDescription className="line-clamp-3 min-h-10 leading-relaxed">
                        {item.description || 'No description provided.'}
                    </CardDescription>
                </div>
            </CardHeader>

            {isService ||
                (isPart && (
                    <CardContent className="mt-auto px-5 pb-5">
                        <div className="grid grid-cols-2 gap-4 rounded-xl bg-muted/40 p-4">
                            <div className="flex items-center gap-2.5">
                                <Wallet className="size-4 shrink-0 text-muted-foreground" />

                                <div className="min-w-0">
                                    <p className="text-xs text-muted-foreground">
                                        {isPart
                                            ? t('inventory.unit_price')
                                            : t('inventory.base_price')}
                                    </p>
                                    <p className="font-semibold">
                                        {item.price != null
                                            ? priceFormatter.format(
                                                  Number(item.price),
                                              )
                                            : '—'}
                                    </p>
                                </div>
                            </div>

                            {isService && (
                                <div className="flex items-center gap-2.5">
                                    <Clock3 className="size-4 shrink-0 text-muted-foreground" />

                                    <div className="min-w-0">
                                        <p className="text-xs text-muted-foreground">
                                            Duration
                                        </p>
                                        <p className="font-semibold">
                                            {item.duration != null
                                                ? formatDuration(item.duration)
                                                : '—'}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {isPart && (
                                <div className="flex items-center gap-2.5">
                                    <Package className="size-4 shrink-0 text-muted-foreground" />

                                    <div className="items-left flex min-w-0 flex-col gap-1">
                                        <p className="text-xs text-muted-foreground">
                                            {t('fields.stock_quantity')}
                                        </p>

                                        <div className="flex items-center gap-1">
                                            {can?.update && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="cursor-pointer"
                                                    size="icon-xs"
                                                    aria-label={`Decrease stock for ${item.name}`}
                                                    disabled={
                                                        stockUpdating ||
                                                        (item.stock_quantity ??
                                                            0) <= 0
                                                    }
                                                    onClick={() =>
                                                        handleStockChange(
                                                            'decrement',
                                                        )
                                                    }
                                                >
                                                    <Minus className="size-2.5" />
                                                </Button>
                                            )}

                                            {can?.update ? (
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    step="1"
                                                    inputMode="numeric"
                                                    value={stockInput}
                                                    onChange={(e) =>
                                                        setStockInput(
                                                            e.target.value,
                                                        )
                                                    }
                                                    onBlur={handleStockBlur}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            e.currentTarget.blur();
                                                        }

                                                        if (
                                                            e.key === 'Escape'
                                                        ) {
                                                            setStockInput(
                                                                String(
                                                                    item.stock_quantity ??
                                                                        0,
                                                                ),
                                                            );
                                                            e.currentTarget.blur();
                                                        }
                                                    }}
                                                    disabled={stockUpdating}
                                                    aria-label={`Stock quantity for ${item.name}`}
                                                    className="h-8 w-12 [appearance:textfield] text-center font-semibold tabular-nums [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                />
                                            ) : (
                                                <span className="min-w-8 text-center font-semibold tabular-nums">
                                                    {item.stock_quantity ?? 0}
                                                </span>
                                            )}

                                            {can?.update && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="cursor-pointer"
                                                    size="icon-xs"
                                                    aria-label={`Increase stock for ${item.name}`}
                                                    disabled={stockUpdating}
                                                    onClick={() =>
                                                        handleStockChange(
                                                            'increment',
                                                        )
                                                    }
                                                >
                                                    <Plus className="size-2.5" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                ))}

            <CardFooter className="mt-auto gap-2 border-t p-4">
                {can?.update && (
                    <Button variant="outline" className="w-3/5 flex-1" asChild>
                        <Link href={editUrl}>
                            <Pencil className="size-4" />
                            {t('common.edit')}
                        </Link>
                    </Button>
                )}

                {can?.delete && (
                    <Button
                        variant="destructive"
                        className="w-2/5 cursor-pointer"
                        onClick={handleDelete}
                    >
                        <Trash2 className="size-4" />
                        {t('common.delete')}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
