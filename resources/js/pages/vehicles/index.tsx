import { Head, Link } from '@inertiajs/react';
import { create as vehicleCreate } from '@/routes/vehicles';
import { Button } from '@/components/ui/button';
import VehicleCard from '@/components/vehicles/vehicle-card';

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
    vehicles: {
        data: Vehicle[];
    };
    header: string;
    paragraph: string;
    can: {
        create: boolean;
    };
}

export default function VehiclesIndex({
    vehicles,
    header,
    paragraph,
    can,
}: Props) {
    return (
        <>
            <Head title={header} />

            <div className="space-y-8 p-6">
                <header className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight">
                            {header}
                        </h1>
                        <p className="text-muted-foreground">{paragraph}</p>
                    </div>

                    {can.create && (
                        <Button size="lg" asChild>
                            <Link href={vehicleCreate()}>Add Vehicle</Link>
                        </Button>
                    )}
                </header>

                <ul className="grid gap-4 sm:grid-cols-2">
                    {vehicles.data.length === 0 ? (
                        <li className="col-span-full space-y-4 text-center">
                            <p className="text-muted-foreground">
                                No vehicles found.
                            </p>

                            {can.create && (
                                <Button variant="outline" asChild>
                                    <Link href={vehicleCreate()}>
                                        Add Vehicle
                                    </Link>
                                </Button>
                            )}
                        </li>
                    ) : (
                        vehicles.data.map((vehicle) => (
                            <li key={vehicle.id}>
                                <VehicleCard vehicle={vehicle} />
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </>
    );
}
