export interface Todo{
    id?: BigInteger
    title: string;
    desc: string;
    creatDate: Date;
    endDate?: Date;
    completed: boolean;
}