import ServiceCategoryFormInputs from '@/components/service_categories/form-inputs';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { index, update } from '@/routes/service_categories';
import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, FolderPlus, LoaderCircle, Save } from 'lucide-react';

interface Props {
    category: {
        id: number;
        name: string;
        description: string | null;
    };
}

export default function ServiceCategoryEdit({ category }: Props) {
    return (
        <>
            <Head title="Edit Service Category" />

            <div className="mx-auto w-full max-w-3xl space-y-6 p-6">
                <Button variant="ghost" size="sm" asChild>
                    <Link href={index()}>
                        <ArrowLeft className="size-4" />
                        Back to categories
                    </Link>
                </Button>

                <Card>
                    <CardHeader className="border-b">
                        <div className="flex items-center gap-3">
                            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <FolderPlus className="size-6" />
                            </div>

                            <div>
                                <CardTitle className="text-xl">
                                    Edit Service Category
                                </CardTitle>
                                <CardDescription>
                                    Edit the details of your auto repair service
                                    category.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <Form {...update.form(category.id)}>
                        {({ processing, errors }) => (
                            <>
                                <CardContent className="grid gap-5 py-6">
                                    <ServiceCategoryFormInputs
                                        errors={errors}
                                        category={category}
                                    />
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
                                        Submit Changes
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
