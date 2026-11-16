import { Head, Link, router } from '@inertiajs/react';
import {
    show as vehicleShow,
    create as vehicleCreate,
    destroy as vehicleDestroy,
} from '@/routes/vehicles';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Vehicle {
    id: number;
    brand: string;
    model: string;
    year: number;
    license_plate: string;
    mileage: number;
}

interface Props {
    vehicles: {
        data: Vehicle[];
    };
}

export default function VehiclesIndex({ vehicles }: Props) {
    return (
        <>
            <Head title="Vehicles" />
            <div className="space-y-8 p-6">
                <header className="flex items-center justify-between space-y-1">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight">
                            Vehicle Management
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your vehicles and see their details.
                        </p>
                    </div>
                    <Button size="lg" asChild>
                        <Link href={vehicleCreate()}>Add Vehicle</Link>
                    </Button>
                </header>
                <div className="grid gap-4 sm:grid-cols-2">
                    {vehicles.data.length === 0 ? (
                        <div className="col-span-full space-y-4 text-center">
                            <p className="text-muted-foreground">
                                No vehicles found.
                            </p>
                            <Button
                                className="cursor:pointer"
                                variant="outline"
                                asChild
                            >
                                <Link href={vehicleCreate()}>Add Vehicle</Link>
                            </Button>
                        </div>
                    ) : (
                        vehicles.data.map((vehicle) => (
                            <Card
                                key={vehicle.id}
                                className="h-full transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-muted/25 hover:shadow-md"
                            >
                                <CardHeader className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>
                                            {vehicle.brand} {vehicle.model}
                                        </CardTitle>
                                        <CardDescription>
                                            {vehicle.license_plate}
                                        </CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link
                                                href={vehicleShow(vehicle.id)}
                                            >
                                                See Details
                                            </Link>
                                        </Button>
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
                                                        vehicleDestroy.url(
                                                            vehicle.id,
                                                        ),
                                                    );
                                                }
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
