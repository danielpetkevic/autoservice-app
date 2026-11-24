import {
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Package, Wallet } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import StockQuantity from '../stock-quantity';
import type { Part } from '@/types/part';

interface Props {
    item: Part;
    canUpdate: boolean;
}

export default function PartContent({ item, canUpdate }: Props) {
    const { t, i18n } = useTranslation();

    const formattedPrice = new Intl.NumberFormat(i18n.language, {
        style: 'currency',
        currency: 'EUR',
    }).format(Number(item.price));

    const stockStatus =
        item.stock_quantity === 0
            ? t('inventory.out_of_stock')
            : item.stock_quantity <= 5
              ? t('inventory.low_stock')
              : t('inventory.in_stock');

    return (
        <>
            <CardHeader className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Package className="size-5" />
                    </div>

                    <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            item.stock_quantity === 0
                                ? 'bg-destructive/10 text-destructive'
                                : item.stock_quantity <= 5
                                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                  : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        }`}
                    >
                        {stockStatus}
                    </span>
                </div>

                <div className="space-y-1.5">
                    <p className="text-xs text-muted-foreground">
                        SKU: {item.sku}
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
                                {t('inventory.unit_price')}
                            </p>
                            <p className="font-semibold">{formattedPrice}</p>
                        </div>
                    </div>

                    <StockQuantity item={item} can={canUpdate} />
                </div>
            </CardContent>
        </>
    );
}
