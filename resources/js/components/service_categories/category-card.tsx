import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Wrench } from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import {
    edit as serviceCategoryEdit,
    destroy as serviceCategoryDestroy,
} from '@/routes/service_categories';
import { Button } from '../ui/button';

interface Props {
    category: {
        id: number;
        name: string;
        description: string | null;
    };
}

export default function CategoryCard({ category }: Props) {
    return (
        <Card className="flex h-full justify-around transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-muted/25 hover:shadow-md">
            <CardHeader>
                <div className="flex items-start gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Wrench className="size-5" />
                    </div>

                    <div className="min-w-0 space-y-1">
                        <CardTitle>
                            <h2 className="text-base font-semibold">
                                {category.name}
                            </h2>
                        </CardTitle>

                        <CardDescription>
                            {category.description || 'No description provided.'}
                        </CardDescription>
                    </div>
                    <div className="ml-auto flex flex-col items-center justify-end gap-2">
                        <Button variant="outline" className="w-full" asChild>
                            <Link href={serviceCategoryEdit.url(category.id)}>
                                Edit
                            </Link>
                        </Button>
                        <Button
                            variant="destructive"
                            className="cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                if (
                                    confirm(
                                        'Are you sure you want to delete this service category?',
                                    )
                                ) {
                                    router.delete(
                                        serviceCategoryDestroy.url(category.id),
                                    );
                                }
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
}
