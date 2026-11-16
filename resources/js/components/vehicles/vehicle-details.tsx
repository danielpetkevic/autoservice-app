import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Link, router } from '@inertiajs/react';
import {
    CalendarDays,
    CarFront,
    Fingerprint,
    Gauge,
    Pencil,
    Trash2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
    destroy as vehicleDestroy,
    edit as vehicleEdit,
} from '@/routes/vehicles';

interface Vehicle {
    id: number;
    brand: string;
    model: string;
    year: number;
    license_plate: string;
    vin: string;
    mileage: number;
    owner?: {
        id: number;
        name: string;
    } | null;
    can: {
        view: boolean;
        update: boolean;
        delete: boolean;
    };
}

interface Props {
    vehicle: Vehicle;
}

interface VehicleDetail {
    label: string;
    value: string | number;
    icon: LucideIcon;
}

export default function VehicleDetails({ vehicle }: Props) {
    const details: VehicleDetail[] = [
        {
            label: 'Year',
            value: vehicle.year,
            icon: CalendarDays,
        },
        {
            label: 'License Plate',
            value: vehicle.license_plate,
            icon: CarFront,
        },
        {
            label: 'VIN',
            value: vehicle.vin,
            icon: Fingerprint,
        },
        {
            label: 'Mileage',
            value: `${vehicle.mileage.toLocaleString('en-US')} km`,
            icon: Gauge,
        },
    ];

    const handleDelete = (): void => {
        if (!window.confirm('Are you sure you want to delete this vehicle?')) {
            return;
        }

        router.delete(vehicleDestroy.url(vehicle.id));
    };

    return (
        <Card>
            <CardHeader className="flex items-center justify-between border-b pb-6">
                <div className="flex items-center gap-4">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <CarFront className="size-7" />
                    </div>

                    <div className="min-w-0">
                        <CardTitle className="text-2xl font-semibold tracking-tight">
                            {vehicle.brand} {vehicle.model}
                        </CardTitle>
                        <CardDescription className="mt-1">
                            Vehicle details and specifications
                        </CardDescription>
                    </div>
                </div>
                {vehicle.can.update && (
                    <Button variant="outline" asChild>
                        <Link href={vehicleEdit(vehicle.id)}>
                            <Pencil className="size-4" />
                            Edit Vehicle
                        </Link>
                    </Button>
                )}
            </CardHeader>

            <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                    {details.map(({ label, value, icon: Icon }) => (
                        <div
                            key={label}
                            className="flex items-center gap-4 rounded-xl border bg-muted/30 p-4"
                        >
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground shadow-sm">
                                <Icon className="size-5" />
                            </div>

                            <div className="min-w-0 space-y-1">
                                <p className="text-xs font-medium text-muted-foreground">
                                    {label}
                                </p>
                                <p className="text-sm font-semibold break-all">
                                    {value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            {vehicle.can.delete && (
                <CardFooter className="flex w-full justify-center border-t pt-4">
                    <Button
                        variant="destructive"
                        size="lg"
                        onClick={handleDelete}
                        className="cursor-pointer"
                    >
                        <Trash2 className="size-4" />
                        Delete Vehicle
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}
