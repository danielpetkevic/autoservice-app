export interface Part {
    id: number;
    name: string;
    sku: string;
    description: string | null;
    price: number;
    stock_quantity: number;
    can: {
        update: boolean;
        delete: boolean;
    };
}
