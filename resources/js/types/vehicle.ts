export interface Vehicle {
    id: number;
    brand: string;
    model: string;
    year: number;
    license_plate: string;
    mileage: number;
    vin: string;
    owner?: {
        id: number;
        name: string;
    } | null;
    can: {
        view: boolean;
        update: boolean;
        delete: boolean;
    };
}
