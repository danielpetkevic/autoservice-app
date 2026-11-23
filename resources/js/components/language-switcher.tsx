import { useTranslation } from 'react-i18next';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    return (
        <Select
            value={i18n.resolvedLanguage ?? 'en'}
            onValueChange={(locale) => {
                void i18n.changeLanguage(locale);
            }}
        >
            <SelectTrigger className="w-36">
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="lt">Lietuvių</SelectItem>
                <SelectItem value="pl">Polski</SelectItem>
            </SelectContent>
        </Select>
    );
}
