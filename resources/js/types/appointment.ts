import type { Service } from '@/types';
import type { Vehicle } from '@/types';

export interface Appointment {
    id: number;
    vehicle: Vehicle;
    services: Service[];
    appointment_at: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    notes: string | null;
    can: {
        update: boolean;
        delete: boolean;
        manage: boolean;
        cancel: boolean;
    };
}
