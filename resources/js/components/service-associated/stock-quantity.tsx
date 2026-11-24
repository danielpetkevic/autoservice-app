import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { Minus, Package, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';
import { Input } from '../ui/input';

interface Item {
    id: number;
    name?: string;
    stock_quantity?: number | null;
}

interface Props {
    item: Item;
    can?: boolean;
}

export default function StockQuantity({ item, can }: Props) {
    const { t } = useTranslation();

    const [stockInput, setStockInput] = useState(
        String(item.stock_quantity ?? 0),
    );

    const [stockUpdating, setStockUpdating] = useState(false);

    useEffect(() => {
        setStockInput(String(item.stock_quantity ?? 0));
    }, [item.stock_quantity]);

    const handleStockBlur = () => {
        if (!can || stockUpdating) return;

        const original = item.stock_quantity ?? 0;
        const value = stockInput.trim();
        const newStock = Number(value);

        if (value === '' || !Number.isSafeInteger(newStock) || newStock < 0) {
            setStockInput(String(original));
            return;
        }

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
        <>
            <div className="flex items-center gap-2.5">
                <Package className="size-4 shrink-0 text-muted-foreground" />

                <div className="items-left flex min-w-0 flex-col gap-1">
                    <p className="text-xs text-muted-foreground">
                        {t('fields.stock_quantity')}
                    </p>

                    <div className="flex items-center gap-1">
                        {can && (
                            <Button
                                type="button"
                                variant="outline"
                                className="cursor-pointer"
                                size="icon-xs"
                                aria-label={`Decrease stock for ${item.name}`}
                                disabled={
                                    stockUpdating ||
                                    (item.stock_quantity ?? 0) <= 0
                                }
                                onClick={() => handleStockChange('decrement')}
                            >
                                <Minus className="size-2.5" />
                            </Button>
                        )}

                        {can ? (
                            <Input
                                type="number"
                                min="0"
                                step="1"
                                inputMode="numeric"
                                value={stockInput}
                                onChange={(e) => setStockInput(e.target.value)}
                                onBlur={handleStockBlur}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        e.currentTarget.blur();
                                    }

                                    if (e.key === 'Escape') {
                                        setStockInput(
                                            String(item.stock_quantity ?? 0),
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

                        {can && (
                            <Button
                                type="button"
                                variant="outline"
                                className="cursor-pointer"
                                size="icon-xs"
                                aria-label={`Increase stock for ${item.name}`}
                                disabled={stockUpdating}
                                onClick={() => handleStockChange('increment')}
                            >
                                <Plus className="size-2.5" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
