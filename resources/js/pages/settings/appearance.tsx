import { Head } from '@inertiajs/react';
import AppearanceTabs from '@/components/appearance-tabs';
import Heading from '@/components/heading';
import { edit as editAppearance } from '@/routes/appearance';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

export default function Appearance() {
    const { t } = useTranslation();
    return (
        <>
            <Head title={t('settings.appearance_title')} />

            <h1 className="sr-only">{t('settings.appearance_title')}</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title={t('settings.appearance_title')}
                    description={t('settings.appearance_description')}
                />
                <AppearanceTabs />
            </div>
        </>
    );
}

Appearance.layout = {
    breadcrumbs: [
        {
            get title() {
                return i18n.t('settings.appearance_title');
            },
            href: editAppearance(),
        },
    ],
};
