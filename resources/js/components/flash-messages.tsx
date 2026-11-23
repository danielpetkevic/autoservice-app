import { usePage } from '@inertiajs/react';
import type { PageProps } from '@inertiajs/core';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface FlashProps extends PageProps {
    flash?: {
        success?: string | null;
        error?: string | null;
    };
}

export default function FlashMessages() {
    const { flash } = usePage<FlashProps>().props;
    const { t } = useTranslation();

    useEffect(() => {
        if (flash?.success) {
            toast.success(t(flash.success));
        }

        if (flash?.error) {
            toast.error(t(flash.error));
        }
    }, [flash?.success, flash?.error, t]);

    return null;
}
