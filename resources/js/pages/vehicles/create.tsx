import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { index, store } from '@/routes/vehicles';
import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, CarFront, LoaderCircle, Save } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function VehicleCreate() {
    const currentYear = new Date().getFullYear();
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('vehicle.add_title')} />

            <div className="mx-auto w-full max-w-3xl space-y-6 p-6">
                <Button variant="ghost" size="sm" asChild>
                    <Link href={index()}>
                        <ArrowLeft className="size-4" />
                        {t('vehicle.back_to_vehicles')}
                    </Link>
                </Button>

                <Card>
                    <CardHeader className="border-b">
                        <div className="flex items-center gap-3">
                            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <CarFront className="size-6" />
                            </div>
                            <div>
                                <CardTitle className="text-xl">
                                    {t('vehicle.add_title')}
                                </CardTitle>
                                <CardDescription>
                                    {t('vehicle.add_description')}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <Form {...store.form()}>
                        {({ processing, errors }) => (
                            <>
                                <CardContent className="grid gap-5 py-6 sm:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="brand">
                                            {t('fields.brand')}
                                        </Label>
                                        <Input
                                            id="brand"
                                            name="brand"
                                            placeholder={t(
                                                'placeholders.vehicle_brand',
                                            )}
                                            required
                                            maxLength={255}
                                        />
                                        <InputError message={errors.brand} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="model">
                                            {t('fields.model')}
                                        </Label>
                                        <Input
                                            id="model"
                                            name="model"
                                            placeholder={t(
                                                'placeholders.vehicle_model',
                                            )}
                                            required
                                            maxLength={255}
                                        />
                                        <InputError message={errors.model} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="year">
                                            {t('fields.year')}
                                        </Label>
                                        <Input
                                            id="year"
                                            name="year"
                                            type="number"
                                            min={1900}
                                            max={currentYear}
                                            placeholder={String(currentYear)}
                                            required
                                        />
                                        <InputError message={errors.year} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="license_plate">
                                            {t('fields.license_plate')}
                                        </Label>
                                        <Input
                                            id="license_plate"
                                            name="license_plate"
                                            placeholder={t(
                                                'placeholders.license_plate',
                                            )}
                                            maxLength={255}
                                            className="uppercase"
                                            required
                                        />
                                        <InputError
                                            message={errors.license_plate}
                                        />
                                    </div>

                                    <div className="grid gap-2 sm:col-span-2">
                                        <Label htmlFor="vin">
                                            {t('fields.vin')}
                                        </Label>
                                        <Input
                                            id="vin"
                                            name="vin"
                                            placeholder={t('placeholders.vin')}
                                            minLength={17}
                                            maxLength={17}
                                            className="font-mono uppercase"
                                            required
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            {t('vehicle.vin_help')}
                                        </p>
                                        <InputError message={errors.vin} />
                                    </div>

                                    <div className="grid gap-2 sm:col-span-2">
                                        <Label htmlFor="mileage">
                                            {t('fields.mileage')}
                                        </Label>
                                        <Input
                                            id="mileage"
                                            name="mileage"
                                            type="number"
                                            min={0}
                                            step={1}
                                            placeholder={t(
                                                'placeholders.mileage',
                                            )}
                                            required
                                        />
                                        <InputError message={errors.mileage} />
                                    </div>
                                </CardContent>

                                <CardFooter className="flex justify-end gap-3 border-t pt-5">
                                    <Button variant="outline" asChild>
                                        <Link href={index()}>
                                            {t('common.cancel')}
                                        </Link>
                                    </Button>

                                    <Button type="submit" disabled={processing}>
                                        {processing ? (
                                            <LoaderCircle className="size-4 animate-spin" />
                                        ) : (
                                            <Save className="size-4" />
                                        )}
                                        Save Vehicle
                                    </Button>
                                </CardFooter>
                            </>
                        )}
                    </Form>
                </Card>
            </div>
        </>
    );
}
