import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FolderOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ServiceCategory } from '@/types/service-category';

interface Props {
    item: ServiceCategory;
}

export default function CategoryContent({ item }: Props) {
    const { t } = useTranslation();

    return (
        <CardHeader className="space-y-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FolderOpen className="size-5" />
            </div>

            <div className="space-y-1.5">
                <CardTitle className="text-lg">{item.name}</CardTitle>

                <CardDescription className="line-clamp-3 min-h-10">
                    {item.description || t('inventory.no_description')}
                </CardDescription>
            </div>
        </CardHeader>
    );
}
