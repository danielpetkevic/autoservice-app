import { usePage } from '@inertiajs/react';
import type { PageProps } from '@inertiajs/core';
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

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash?.success, flash?.error]);

    return null;
}
