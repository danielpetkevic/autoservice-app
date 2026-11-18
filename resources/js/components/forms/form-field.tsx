import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import type { ReactNode } from 'react';

interface FormFieldProps {
    name: string;
    label: string;
    error?: string;
    description?: string;
    required?: boolean;
    children: ReactNode;
}

export default function FormField({
    name,
    label,
    error,
    description,
    required = false,
    children,
}: FormFieldProps) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={name}>
                {label}
                {required && <span className="ml-1 text-destructive">*</span>}
            </Label>

            {children}

            {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
            )}

            <InputError message={error} />
        </div>
    );
}
