import ItemCard from '@/components/service-associated/item-card';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { FolderOpen, Plus } from 'lucide-react';
import {
    edit as serviceEdit,
    destroy as serviceDestroy,
} from '@/routes/services';
import type { Service } from '@/types/service';

interface Props {
    services: { data: Service[] };
    header: string;
    paragraph: string;
    can: {
        create: boolean;
    };
}

export default function ServicesIndex({
    services,
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
                            <Link href="/services/create">
                                <Plus className="size-4" />
                                Add Services
                            </Link>
                        </Button>
                    )}
                </header>

                {services.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed p-12 text-center">
                        <FolderOpen className="size-10 text-muted-foreground" />
                        <div className="space-y-1">
                            <h2 className="font-semibold">No services found</h2>
                            <p className="text-sm text-muted-foreground">
                                Create a service to add to your offerings.
                            </p>
                        </div>
                    </div>
                ) : (
                    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {services.data.map((service) => (
                            <li key={service.id}>
                                <ItemCard
                                    item={service}
                                    editUrl={serviceEdit.url(service.id)}
                                    deleteUrl={serviceDestroy.url(service.id)}
                                    type="service"
                                    can={service.can}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
