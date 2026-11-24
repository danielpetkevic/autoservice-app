import ItemCard from '@/components/service-associated/item-card';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { FolderOpen, Plus } from 'lucide-react';
import { edit as partEdit, destroy as partDestroy } from '@/routes/parts';
import type { Part } from '@/types';
import { useTranslation } from 'react-i18next';
import PartContent from '@/components/service-associated/cards/part-content';

interface Props {
    parts: { data: Part[] };
    header: string;
    paragraph: string;
    can: {
        create: boolean;
    };
}

export default function PartsIndex({ parts, header, paragraph, can }: Props) {
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
                            <Link href="/parts/create">
                                <Plus className="size-4" />
                                {t('listings.add_part')}
                            </Link>
                        </Button>
                    )}
                </header>

                {parts.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed p-12 text-center">
                        <FolderOpen className="size-10 text-muted-foreground" />
                        <div className="space-y-1">
                            <h2 className="font-semibold">
                                {t('listings.no_parts')}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                {t('listings.create_part_empty')}
                            </p>
                        </div>
                    </div>
                ) : (
                    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {parts.data.map((part) => (
                            <li key={part.id}>
                                <ItemCard
                                    editUrl={partEdit.url(part.id)}
                                    deleteUrl={partDestroy.url(part.id)}
                                    can={part.can}
                                >
                                    <PartContent
                                        item={part}
                                        canUpdate={part.can.update}
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
