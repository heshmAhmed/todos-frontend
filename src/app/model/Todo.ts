export interface Todo{
    id?: string
    title: string;
    desc: string;
    createdDate: Date;
    endDate?: Date;
    completed: boolean;
}