import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle, Save } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface FormCardProps {
    title: string;
    description: string;
    backUrl: string;
    backLabel?: string;
    submitLabel: string;
    processing: boolean;
    icon: ReactNode;
    children: ReactNode;
}

export default function FormCard({
    title,
    description,
    backUrl,
    backLabel = 'Back',
    submitLabel,
    processing,
    icon,
    children,
}: FormCardProps) {
    const { t } = useTranslation();
    const resolvedBackLabel =
        backLabel === 'Back' ? t('common.back') : backLabel;

    return (
        <div className="mx-auto w-full max-w-3xl space-y-6 p-6">
            <Button variant="ghost" size="sm" asChild>
                <Link href={backUrl}>
                    <ArrowLeft className="size-4" />
                    {resolvedBackLabel}
                </Link>
            </Button>

            <Card>
                <CardHeader className="border-b">
                    <div className="flex items-center gap-3">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            {icon}
                        </div>

                        <div className="space-y-1">
                            <CardTitle className="text-xl">{title}</CardTitle>

                            <CardDescription>{description}</CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="grid gap-5 py-6">
                    {children}
                </CardContent>

                <CardFooter className="flex justify-end gap-3 border-t pt-5">
                    <Button variant="outline" asChild>
                        <Link href={backUrl}>{t('common.cancel')}</Link>
                    </Button>

                    <Button type="submit" disabled={processing}>
                        {processing ? (
                            <LoaderCircle className="size-4 animate-spin" />
                        ) : (
                            <Save className="size-4" />
                        )}

                        {submitLabel}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
