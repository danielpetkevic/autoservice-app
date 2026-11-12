import { statistics } from '@/constants';
import { Head } from '@inertiajs/react';
import { Activity, CalendarDays, Car, Users } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from '@/components/ui/card';

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

    const icons = {
        totalUsers: Users,
        totalVehicles: Car,
        totalAppointments: CalendarDays,
        totalRepairOrders: Activity,
    };

    return (
        <>
            <Head title="Admin dashboard" />
            <div className="space-y-8 p-6">
                <header className="space-y-1">
                    <p className="text-sm font-medium text-primary">
                        AutoService overview
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Admin dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Overview of your auto service business.
                    </p>
                </header>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {statistics.map((statistic) => (
                        <Card key={statistic.key}>
                            <CardHeader className="flex-row items-center justify-between">
                                <CardDescription>
                                    {statistic.label}
                                </CardDescription>
                                {(() => {
                                    const Icon = icons[statistic.key];
                                    return (
                                        <Icon className="size-5 text-primary" />
                                    );
                                })()}
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-semibold">
                                    {totals[statistic.key]}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Current total
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}
