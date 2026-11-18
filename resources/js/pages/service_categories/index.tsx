import CategoryCard from '@/components/service_categories/category-card';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { FolderOpen, Plus } from 'lucide-react';

interface ServiceCategory {
    id: number;
    name: string;
    description: string | null;
}

interface Props {
    categories: {
        data: ServiceCategory[];
    };
    header: string;
    paragraph: string;
    can: {
        create: boolean;
    };
}

export default function ServiceCategoriesIndex({
    categories,
    header,
    paragraph,
    can,
}: Props) {
    return (
        <>
            <Head title={header} />

            <div className="space-y-8 p-6">
                <header className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-semibold tracking-tight">
                            {header}
                        </h1>
                        <p className="text-muted-foreground">{paragraph}</p>
                    </div>

                    {can.create && (
                        <Button size="lg" asChild>
                            <Link href="/service_categories/create">
                                <Plus className="size-4" />
                                Add Category
                            </Link>
                        </Button>
                    )}
                </header>

                {categories.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed p-12 text-center">
                        <FolderOpen className="size-10 text-muted-foreground" />
                        <div className="space-y-1">
                            <h2 className="font-semibold">
                                No service categories found
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Create a category to organize your services.
                            </p>
                        </div>
                    </div>
                ) : (
                    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {categories.data.map((category) => (
                            <li key={category.id}>
                                <CategoryCard category={category} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
