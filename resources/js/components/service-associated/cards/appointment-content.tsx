import {
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Calendar, Car, Clock3, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Appointment } from '@/types/appointment';
import { Button } from '@/components/ui/button';
import { Check, X, StickyNote, LoaderCircle } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    item: Appointment;
    canManage: boolean;
    canCancel: boolean;
}

export default function AppointmentContent({
    item,
    canManage,
    canCancel,
}: Props) {
    const { t, i18n } = useTranslation();

    const date = new Date(item.appointment_at);

    const formattedDate = Number.isNaN(date.getTime())
        ? '—'
        : date.toLocaleDateString(i18n.language, {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
          });

    const formattedTime = Number.isNaN(date.getTime())
        ? '—'
        : date.toLocaleTimeString(i18n.language, {
              hour: '2-digit',
              minute: '2-digit',
          });

    const [processingStatus, setProcessingStatus] = useState<
        'completed' | 'cancelled' | null
    >(null);

    const handleStatusComplete = (status: 'completed') => {
        if (
            !canManage ||
            processingStatus !== null ||
            item.status !== 'scheduled'
        )
            return;

        setProcessingStatus(status);

        router.patch(
            `/appointments/${item.id}/status`,
            { status },
            {
                preserveScroll: true,
                onFinish: () => setProcessingStatus(null),
            },
        );
    };

    const handleStatusCancel = (status: 'cancelled') => {
        if (
            !canCancel ||
            processingStatus !== null ||
            item.status !== 'scheduled'
        )
            return;

        setProcessingStatus(status);

        router.patch(
            `/appointments/${item.id}/cancel`,
            { status },
            {
                preserveScroll: true,
                onFinish: () => setProcessingStatus(null),
            },
        );
    };

    return (
        <>
            <CardHeader className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Calendar className="size-5" />
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-2">
                        <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                item.status === 'cancelled'
                                    ? 'bg-destructive/10 text-destructive'
                                    : item.status === 'scheduled'
                                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            }`}
                        >
                            {t(`appointment.${item.status}`)}
                        </span>

                        {canManage && item.status === 'scheduled' ? (
                            <div className="flex items-center gap-1">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon-sm"
                                    className="cursor-pointer text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-600 dark:text-emerald-400"
                                    onClick={() =>
                                        handleStatusComplete('completed')
                                    }
                                    disabled={processingStatus !== null}
                                    aria-label={t('appointment.complete')}
                                    title={t('appointment.complete')}
                                >
                                    {processingStatus === 'completed' ? (
                                        <LoaderCircle className="size-4 animate-spin" />
                                    ) : (
                                        <Check className="size-4" />
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon-sm"
                                    className="cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
                                    onClick={() =>
                                        handleStatusCancel('cancelled')
                                    }
                                    disabled={processingStatus !== null}
                                    aria-label={t('appointment.cancel')}
                                    title={t('appointment.cancel')}
                                >
                                    {processingStatus === 'cancelled' ? (
                                        <LoaderCircle className="size-4 animate-spin" />
                                    ) : (
                                        <X className="size-4" />
                                    )}
                                </Button>
                            </div>
                        ) : (
                            canCancel && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon-sm"
                                    className="cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
                                    onClick={() =>
                                        handleStatusCancel('cancelled')
                                    }
                                    disabled={processingStatus !== null}
                                    aria-label={t('appointment.cancel')}
                                    title={t('appointment.cancel')}
                                >
                                    {processingStatus === 'cancelled' ? (
                                        <LoaderCircle className="size-4 animate-spin" />
                                    ) : (
                                        <X className="size-4" />
                                    )}
                                </Button>
                            )
                        )}
                    </div>
                </div>

                <div className="space-y-1.5">
                    <CardTitle className="text-lg">{formattedDate}</CardTitle>

                    <CardDescription className="flex items-center gap-2">
                        <Clock3 className="size-4" />
                        {formattedTime}
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="space-y-4 px-5 pb-5">
                <div className="rounded-xl bg-muted/40 p-4">
                    <div className="mb-2 flex items-center gap-2">
                        <Car className="size-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                            {t('navigation.vehicles')}
                        </span>
                    </div>

                    {item.vehicle ? (
                        <>
                            <p className="font-semibold">
                                {item.vehicle.brand} {item.vehicle.model}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {item.vehicle.year} ·{' '}
                                {item.vehicle.license_plate}
                            </p>
                        </>
                    ) : (
                        <p className="text-sm">—</p>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Wrench className="size-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                            {t('navigation.services')}
                        </span>
                    </div>

                    {item.services?.length ? (
                        <ul className="space-y-1">
                            {item.services.map((service) => (
                                <li key={service.id} className="text-sm">
                                    {service.name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            {t('appointment.no_services')}
                        </p>
                    )}
                </div>
                {item.notes?.trim() && (
                    <div className="space-y-2 border-t pt-3">
                        <div className="flex items-center gap-2">
                            <StickyNote className="size-4 text-muted-foreground" />
                            <span className="text-xs font-medium text-muted-foreground">
                                {t('fields.notes')}
                            </span>
                        </div>

                        <p className="text-sm leading-relaxed wrap-break-word whitespace-pre-wrap">
                            {item.notes}
                        </p>
                    </div>
                )}
            </CardContent>
        </>
    );
}
