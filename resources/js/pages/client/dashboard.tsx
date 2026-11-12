import { Head } from '@inertiajs/react';
import { CalendarDays, Car, Plus, Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

interface Vehicle {
    id: number;
    brand: string;
    model: string;
    year: number;
    license_plate: string;
}

interface Appointment {
    id: number;
    appointment_at: string;
    status: string;
    notes: string | null;
    vehicle: {
        brand: string;
        model: string;
    };
    services: {
        name: string;
        price: number;
    }[];
}

interface Props {
    vehicles: Vehicle[];
    appointments: Appointment[];
    userName: string;
}

export default function ClientDashboard({
    vehicles,
    appointments,
    userName,
}: Props) {
    return (
        <>
            <Head title="Client dashboard" />
            <div className="space-y-8 p-6">
                <header className="space-y-1">
                    <p className="text-sm font-medium text-primary">
                        My AutoService
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Welcome, {userName}
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your vehicles and upcoming service appointments.
                    </p>
                </header>

                <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <CardDescription>My vehicles</CardDescription>
                            <Car className="size-5 text-primary" />
                        </CardHeader>
                        <CardContent className="text-3xl font-semibold">
                            {vehicles.length}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <CardDescription>Appointments</CardDescription>
                            <CalendarDays className="size-5 text-primary" />
                        </CardHeader>
                        <CardContent className="text-3xl font-semibold">
                            {appointments.length}
                        </CardContent>
                    </Card>
                </div>

                <section className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-semibold">
                                My vehicles
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Vehicles registered with AutoService.
                            </p>
                        </div>
                        <Badge variant="outline" className="gap-1.5">
                            <Car className="size-3.5" />
                            {vehicles.length}
                        </Badge>
                    </div>

                    {vehicles.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
                                <Plus className="size-8 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">
                                    You have not added any vehicles yet.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-3">
                            {vehicles.map((vehicle) => (
                                <Card key={vehicle.id}>
                                    <CardHeader>
                                        <CardTitle>
                                            {vehicle.brand} {vehicle.model}
                                        </CardTitle>
                                        <CardDescription>
                                            {vehicle.year} ·{' '}
                                            {vehicle.license_plate}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    )}
                </section>

                <section className="space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold">
                            My appointments
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Track your scheduled service visits.
                        </p>
                    </div>

                    {appointments.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
                                <CalendarDays className="size-8 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">
                                    You do not have any appointments yet.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-3">
                            {appointments.map((appointment) => (
                                <Card key={appointment.id}>
                                    <CardHeader className="flex-row items-start justify-between gap-4">
                                        <div className="space-y-1">
                                            <CardTitle>
                                                {appointment.vehicle.brand}{' '}
                                                {appointment.vehicle.model}
                                            </CardTitle>
                                            <CardDescription>
                                                {new Date(
                                                    appointment.appointment_at,
                                                ).toLocaleString()}
                                            </CardDescription>
                                        </div>
                                        <Badge
                                            variant="secondary"
                                            className="capitalize"
                                        >
                                            {appointment.status.replace(
                                                '_',
                                                ' ',
                                            )}
                                        </Badge>
                                    </CardHeader>

                                    <CardContent className="space-y-3">
                                        <div className="flex flex-wrap gap-2">
                                            {appointment.services.map(
                                                (service) => (
                                                    <Badge
                                                        key={service.name}
                                                        variant="outline"
                                                    >
                                                        <Wrench className="size-3.5" />
                                                        {service.name}
                                                    </Badge>
                                                ),
                                            )}
                                        </div>

                                        {appointment.notes && (
                                            <p className="text-sm text-muted-foreground">
                                                {appointment.notes}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}
