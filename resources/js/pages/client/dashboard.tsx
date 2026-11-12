import { Head } from '@inertiajs/react';

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
            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold">Welcome, {userName}</h1>
                    <p className="text-muted-foreground">
                        Manage your vehicles and upcoming service appointments.
                    </p>
                </div>

                <section className="space-y-3">
                    <h2 className="text-lg font-semibold">
                        My vehicles ({vehicles.length})
                    </h2>

                    {vehicles.length === 0 ? (
                        <p className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                            You have not added any vehicles yet.
                        </p>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-3">
                            {vehicles.map((vehicle) => (
                                <div
                                    key={vehicle.id}
                                    className="rounded-lg border p-4"
                                >
                                    <h3 className="font-medium">
                                        {vehicle.brand} {vehicle.model}
                                    </h3>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {vehicle.year} · {vehicle.license_plate}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section className="space-y-3">
                    <h2 className="text-lg font-semibold">
                        My appointments ({appointments.length})
                    </h2>

                    {appointments.length === 0 ? (
                        <p className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                            You do not have any appointments yet.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {appointments.map((appointment) => (
                                <article
                                    key={appointment.id}
                                    className="rounded-lg border p-4"
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                        <div>
                                            <h3 className="font-medium">
                                                {appointment.vehicle.brand}{' '}
                                                {appointment.vehicle.model}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(
                                                    appointment.appointment_at,
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium capitalize">
                                            {appointment.status.replace(
                                                '_',
                                                ' ',
                                            )}
                                        </span>
                                    </div>

                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {appointment.services.map((service) => (
                                            <span
                                                key={service.name}
                                                className="rounded-md bg-muted px-2 py-1 text-sm"
                                            >
                                                {service.name}
                                            </span>
                                        ))}
                                    </div>

                                    {appointment.notes && (
                                        <p className="mt-3 text-sm text-muted-foreground">
                                            {appointment.notes}
                                        </p>
                                    )}
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}
