export interface ServiceCategory {
    id: number;
    name: string;
    description: string | null;
    can: {
        update: boolean;
        delete: boolean;
    };
}
