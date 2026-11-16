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

export default function VehicleCreate() {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <Head title="Add Vehicle" />

            <div className="mx-auto w-full max-w-3xl space-y-6 p-6">
                <Button variant="ghost" size="sm" asChild>
                    <Link href={index()}>
                        <ArrowLeft className="size-4" />
                        Back to vehicles
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
                                    Add New Vehicle
                                </CardTitle>
                                <CardDescription>
                                    Enter your vehicle information below.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <Form {...store.form()}>
                        {({ processing, errors }) => (
                            <>
                                <CardContent className="grid gap-5 py-6 sm:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="brand">Brand</Label>
                                        <Input
                                            id="brand"
                                            name="brand"
                                            placeholder="Toyota"
                                            required
                                            maxLength={255}
                                        />
                                        <InputError message={errors.brand} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="model">Model</Label>
                                        <Input
                                            id="model"
                                            name="model"
                                            placeholder="Corolla"
                                            required
                                            maxLength={255}
                                        />
                                        <InputError message={errors.model} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="year">
                                            Manufacturing Year
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
                                            License Plate
                                        </Label>
                                        <Input
                                            id="license_plate"
                                            name="license_plate"
                                            placeholder="ABC123"
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
                                            Vehicle Identification Number (VIN)
                                        </Label>
                                        <Input
                                            id="vin"
                                            name="vin"
                                            placeholder="JTDBR32E720123456"
                                            minLength={17}
                                            maxLength={17}
                                            className="font-mono uppercase"
                                            required
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Enter the 17-character vehicle
                                            identification number.
                                        </p>
                                        <InputError message={errors.vin} />
                                    </div>

                                    <div className="grid gap-2 sm:col-span-2">
                                        <Label htmlFor="mileage">
                                            Mileage (km)
                                        </Label>
                                        <Input
                                            id="mileage"
                                            name="mileage"
                                            type="number"
                                            min={0}
                                            step={1}
                                            placeholder="150000"
                                            required
                                        />
                                        <InputError message={errors.mileage} />
                                    </div>
                                </CardContent>

                                <CardFooter className="flex justify-end gap-3 border-t pt-5">
                                    <Button variant="outline" asChild>
                                        <Link href={index()}>Cancel</Link>
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
