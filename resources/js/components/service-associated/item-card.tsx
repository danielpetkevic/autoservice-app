import type { ReactNode } from 'react';
import { Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';

interface Props {
    children: ReactNode;
    editUrl?: string;
    deleteUrl?: string;
    can?: {
        update: boolean;
        delete: boolean;
    };
}

export default function ItemCard({ children, editUrl, deleteUrl, can }: Props) {
    const { t } = useTranslation();

    const handleDelete = () => {
        if (!deleteUrl || !can?.delete) return;

        if (!window.confirm(t('common.confirm_delete'))) return;

        router.delete(deleteUrl, {
            preserveScroll: true,
        });
    };

    const showEdit = can?.update && editUrl;
    const showDelete = can?.delete && deleteUrl;

    return (
        <Card className="flex h-full flex-col gap-0 overflow-hidden py-0 transition-[transform,background-color,box-shadow,opacity] duration-200 hover:-translate-y-0.5 hover:bg-muted/25 hover:shadow-md">
            <div className="flex flex-1 flex-col">{children}</div>

            {(showEdit || showDelete) && (
                <CardFooter className="mt-auto flex gap-2 border-t p-4">
                    {showEdit && (
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="flex-1"
                        >
                            <Link href={editUrl}>
                                <Pencil className="size-4" />
                                {t('common.edit')}
                            </Link>
                        </Button>
                    )}

                    {showDelete && (
                        <Button
                            variant="destructive"
                            size="sm"
                            className="flex-1"
                            onClick={handleDelete}
                        >
                            <Trash2 className="size-4" />
                            {t('common.delete')}
                        </Button>
                    )}
                </CardFooter>
            )}
        </Card>
    );
}
