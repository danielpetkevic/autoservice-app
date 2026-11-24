import { useState } from 'react';
import { format, isBefore, startOfDay } from 'date-fns';
import { enUS, lt, pl } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Props {
    name: string;
    defaultValue?: string;
    disabled?: boolean;
}

export default function DateTimePicker({
    name,
    defaultValue = '',
    disabled = false,
}: Props) {
    const { t, i18n } = useTranslation();

    const locales = { en: enUS, lt, pl };
    const locale =
        locales[i18n.language.split('-')[0] as keyof typeof locales] ?? enUS;

    const initialValue = defaultValue ? new Date(defaultValue) : undefined;

    const [date, setDate] = useState<Date | undefined>(
        initialValue && !Number.isNaN(initialValue.getTime())
            ? initialValue
            : undefined,
    );

    const [hour, setHour] = useState(
        initialValue ? format(initialValue, 'HH') : '09',
    );

    const [minute, setMinute] = useState(
        initialValue ? format(initialValue, 'mm') : '00',
    );

    const [open, setOpen] = useState(false);

    const appointmentAt = date
        ? `${format(date, 'yyyy-MM-dd')}T${hour}:${minute}`
        : '';

    return (
        <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={disabled}
                        className="w-full justify-start text-left font-normal"
                    >
                        <CalendarIcon className="mr-2 size-4" />

                        {date ? (
                            format(date, 'PPP', { locale })
                        ) : (
                            <span className="text-muted-foreground">
                                {t('placeholders.select_date')}
                            </span>
                        )}
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(selected) => {
                            if (!selected) return;

                            setDate(selected);
                            setOpen(false);
                        }}
                        disabled={(day) =>
                            isBefore(startOfDay(day), startOfDay(new Date()))
                        }
                        defaultMonth={date}
                        autoFocus
                    />
                </PopoverContent>
            </Popover>

            <div className="relative">
                <div className="grid grid-cols-2 gap-2">
                    <Select value={hour} onValueChange={setHour}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="HH" />
                        </SelectTrigger>

                        <SelectContent>
                            {Array.from({ length: 24 }, (_, index) => {
                                const value = String(index).padStart(2, '0');

                                return (
                                    <SelectItem key={value} value={value}>
                                        {value}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>

                    <Select value={minute} onValueChange={setMinute}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="MM" />
                        </SelectTrigger>

                        <SelectContent>
                            {Array.from({ length: 12 }, (_, index) => {
                                const value = String(index * 5).padStart(
                                    2,
                                    '0',
                                );

                                return (
                                    <SelectItem key={value} value={value}>
                                        {value}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <input type="hidden" name={name} value={appointmentAt} />
        </div>
    );
}
