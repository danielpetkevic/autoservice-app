import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { index as vehiclesIndex } from '@/routes/vehicles';
import VehicleDetails from '@/components/vehicles/vehicle-details';

interface Vehicle {
    id: number;
    brand: string;
    model: string;
    year: number;
    license_plate: string;
    mileage: number;
    vin: string;
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

export default function VehicleShow({ vehicle }: Props) {
    return (
        <>
            <Head title={`${vehicle.brand} ${vehicle.model}`} />

            <div className="mx-auto w-full max-w-4xl p-6">
                <div className="mx-auto w-full max-w-4xl space-y-4 p-6">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={vehiclesIndex()}>
                            <ArrowLeft className="size-4" />
                            Back to vehicles
                        </Link>
                    </Button>
                </div>
                <VehicleDetails vehicle={vehicle}></VehicleDetails>
            </div>
        </>
    );
}
