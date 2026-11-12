import { statistics } from '@/constants';
import { Head } from '@inertiajs/react';

interface Props {
    totalUsers: number;
    totalVehicles: number;
    totalRepairOrders: number;
    totalAppointments: number;
}

export default function AdminDashboard({
    totalUsers,
    totalVehicles,
    totalRepairOrders,
    totalAppointments,
}: Props) {
    const totals = {
        totalUsers,
        totalVehicles,
        totalAppointments,
        totalRepairOrders,
    };

    return (
        <>
            <Head title="Admin dashboard" />
            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold">Admin dashboard</h1>
                    <p className="text-muted-foreground">
                        Overview of your auto service business.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {statistics.map((statistic) => (
                        <div
                            key={statistic.key}
                            className="rounded-lg border bg-card p-5 shadow-sm"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-sm font-medium text-muted-foreground">
                                    {statistic.label}
                                </span>
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${statistic.color}`}
                                >
                                    Total
                                </span>
                            </div>
                            <p className="mt-4 text-3xl font-bold">
                                {totals[statistic.key]}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
