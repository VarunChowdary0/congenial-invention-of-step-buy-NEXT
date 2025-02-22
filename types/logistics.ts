import exp from "constants";
import { Inter_Tight } from "next/font/google";
import { Address } from "./personal";
import { Product } from "./item";



export enum ItemStatus{
    Default = 1,
    SaveForLater = 2
}

export interface CartItem{
    id : string;
    productId : string;
    quantity : number;
    status : ItemStatus;
    product? : Product
}

export interface Cart{
    CartItems : CartItem[];
}

export enum OrderStatus{
    Delivered = "Delivered",
    Shipped = "Shipped",
    Returned = "Returned",
    Cancelled = "Cancelled"
}

export interface Instructions{
    DeliveryId : string;
    DeliveryDescription : string;
}
export interface Delivery{
    Id : string;
    AddressId : string;
    Address : Address;
    CurrentLocation : string;
    Status : OrderStatus;
    Instructions : Instructions[];
}

export interface OrderItem extends CartItem{
    Delivery : Delivery ;
    DateOrdered : string;
    Bill : {}
}
export interface Orders{
    OrderedItems : OrderItem[]
}