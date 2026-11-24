import ItemCard from '@/components/service-associated/item-card';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Plus } from 'lucide-react';
import {
    edit as appointmentEdit,
    destroy as appointmentDestroy,
} from '@/routes/appointments';
import type { Appointment } from '@/types';
import { useTranslation } from 'react-i18next';
import AppointmentContent from '@/components/service-associated/cards/appointment-content';

interface Props {
    appointments: { data: Appointment[] };
    header: string;
    paragraph: string;
    can: {
        create: boolean;
    };
}

export default function AppointmentsIndex({
    appointments,
    header,
    paragraph,
    can,
}: Props) {
    const { t } = useTranslation();
    return (
        <>
            <Head title={t(header)} />

            <div className="space-y-8 p-6">
                <header className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-semibold tracking-tight">
                            {t(header)}
                        </h1>
                        <p className="text-muted-foreground">{t(paragraph)}</p>
                    </div>

                    {can.create && (
                        <Button size="lg" asChild>
                            <Link href="/appointments/create">
                                <Plus className="size-4" />
                                {t('listings.add_appointment')}
                            </Link>
                        </Button>
                    )}
                </header>

                {appointments.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed p-12 text-center">
                        <Calendar className="size-10 text-muted-foreground" />
                        <div className="space-y-1">
                            <h2 className="font-semibold">
                                {t('listings.no_appointments')}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                {t('listings.create_appointment_empty')}
                            </p>
                        </div>
                    </div>
                ) : (
                    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {appointments.data.map((appointment) => (
                            <li key={appointment.id}>
                                <ItemCard
                                    editUrl={appointmentEdit.url(
                                        appointment.id,
                                    )}
                                    deleteUrl={appointmentDestroy.url(
                                        appointment.id,
                                    )}
                                    can={appointment.can}
                                >
                                    <AppointmentContent
                                        item={appointment}
                                        canManage={appointment.can.manage}
                                        canCancel={appointment.can.cancel}
                                    />
                                </ItemCard>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
