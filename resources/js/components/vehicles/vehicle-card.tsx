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

interface Vehicle {
    id: number;
    brand: string;
    model: string;
    year: number;
    license_plate: string;
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

export default function VehicleCard({ vehicle }: Props) {
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
                        <Link href={vehicleShow(vehicle.id)}>See Details</Link>
                    </Button>
                    {vehicle.can.delete && (
                        <Button
                            variant="destructive"
                            size="sm"
                            className="cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                if (
                                    confirm(
                                        'Are you sure you want to delete this vehicle?',
                                    )
                                ) {
                                    router.delete(
                                        vehicleDestroy.url(vehicle.id),
                                    );
                                }
                            }}
                        >
                            Delete
                        </Button>
                    )}
                </div>
            </CardHeader>
        </Card>
    );
}
