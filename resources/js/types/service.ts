import type { ServiceCategory } from './service-category';

export interface ServiceFormData {
    name: string;
    description: string | null;
    category_id: number | null;
    price: number | string;
    duration: number | null;
    is_active: boolean;
}

export interface Service extends ServiceFormData {
    id: number;
    service_category: ServiceCategory | null;
    can: {
        update: boolean;
        delete: boolean;
    };
}
