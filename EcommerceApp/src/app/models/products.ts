export interface Products{
    _id?:string,
    name: string;
    shortDescription:string,
    description:string,
    images:string[],
    price:number,
    discount:number,
    categoryId:string,
    brandId:string,
    isFeatured:boolean,
    isNew:boolean  
}