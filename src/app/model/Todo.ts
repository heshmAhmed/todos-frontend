export interface Todo{
    id?: BigInteger
    title: string;
    desc: string;
    createdDate: Date;
    endDate?: Date;
    completed: boolean;
}