import { Head } from '@inertiajs/react';

interface RepairOrder {
    id: number;
    start_date: string | null;
    appointment: {
        vehicle: {
            brand: string;
            model: string;
        };
    };
}

interface Props {
    repairs: RepairOrder[];
}

export default function MechanicDashboard({ repairs }: Props) {
    return (
        <>
            <Head title="Mechanic dashboard" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">
                    Repair Orders ({repairs.length})
                </h1>

                <ol className="space-y-3">
                    {repairs.map((repair) => (
                        <li
                            key={repair.id}
                            className="rounded-lg border p-4 shadow-sm"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="font-semibold">
                                        Repair order #{repair.id}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        {repair.appointment.vehicle.brand}{' '}
                                        {repair.appointment.vehicle.model}
                                    </p>
                                </div>
                                <time
                                    dateTime={repair.start_date ?? undefined}
                                    className="text-sm text-muted-foreground"
                                >
                                    {repair.start_date
                                        ? new Date(
                                              repair.start_date,
                                          ).toLocaleDateString()
                                        : 'Not started'}
                                </time>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </>
    );
}
