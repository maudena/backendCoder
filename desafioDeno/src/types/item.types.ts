export type Uuid = string;

export interface Item{
    uuid: Uuid,
    name: string,
    price: number,
    description: string,
}