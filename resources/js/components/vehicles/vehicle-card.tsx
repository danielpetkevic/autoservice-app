import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Link, router } from '@inertiajs/react';
import {
    show as vehicleShow,
    destroy as vehicleDestroy,
} from '@/routes/vehicles';
import type { Vehicle } from '@/types';
import { useTranslation } from 'react-i18next';

interface Props {
    vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: Props) {
    const { t } = useTranslation();
    return (
        <Card
            key={vehicle.id}
            className="h-full transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-muted/25 hover:shadow-md"
        >
            <CardHeader className="flex items-center justify-between">
                <div>
                    <CardTitle>
                        {vehicle.brand} {vehicle.model}
                    </CardTitle>
                    <CardDescription>{vehicle.license_plate}</CardDescription>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={vehicleShow(vehicle.id)}>
                            {t('listings.see_details')}
                        </Link>
                    </Button>
                    {vehicle.can.delete && (
                        <Button
                            variant="destructive"
                            size="sm"
                            className="cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                if (confirm(t('vehicle.delete_confirm'))) {
                                    router.delete(
                                        vehicleDestroy.url(vehicle.id),
                                    );
                                }
                            }}
                        >
                            {t('common.delete')}
                        </Button>
                    )}
                </div>
            </CardHeader>
        </Card>
    );
}
