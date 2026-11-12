import { Head } from '@inertiajs/react';
import { ClipboardCheck, Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

interface RepairOrder {
    id: number;
    start_date: string | null;
    status: string;
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
            <div className="space-y-8 p-6">
                <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-primary">
                            Workshop queue
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight">
                            Mechanic dashboard
                        </h1>
                        <p className="text-muted-foreground">
                            Review the repair orders assigned to you.
                        </p>
                    </div>
                    <Badge variant="secondary" className="w-fit gap-1.5">
                        <ClipboardCheck className="size-3.5" />
                        {repairs.length} assigned
                    </Badge>
                </header>

                {repairs.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                            <Wrench className="size-10 text-muted-foreground" />
                            <div>
                                <h2 className="font-medium">
                                    No assigned repairs
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    New repair orders will appear here.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <ol className="space-y-3">
                        {repairs.map((repair) => (
                            <li key={repair.id}>
                                <Card>
                                    <CardHeader className="flex-row items-start justify-between gap-4">
                                        <div className="space-y-1">
                                            <CardTitle>
                                                Repair order #{repair.id}
                                            </CardTitle>
                                            <CardDescription>
                                                {
                                                    repair.appointment.vehicle
                                                        .brand
                                                }{' '}
                                                {
                                                    repair.appointment.vehicle
                                                        .model
                                                }
                                            </CardDescription>
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className="capitalize"
                                        >
                                            {repair.status.replace('_', ' ')}
                                        </Badge>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium text-foreground">
                                                Start date:
                                            </span>{' '}
                                            {repair.start_date
                                                ? new Date(
                                                      repair.start_date,
                                                  ).toLocaleDateString()
                                                : 'Not started'}
                                        </p>
                                    </CardContent>
                                </Card>
                            </li>
                        ))}
                    </ol>
                )}
            </div>
        </>
    );
}
