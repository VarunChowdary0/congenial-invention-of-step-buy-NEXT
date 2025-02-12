import exp from "constants";
import { Inter_Tight } from "next/font/google";
import { Address } from "./personal";



enum ItemStatus{
    Default = "Default",
    Deleted = "Deleted",
    SaveForLater = "SaveForLater"
}

export interface CartItem{
    ProductId : string;
    Quantity : number;
    Status : ItemStatus;
}

export interface Cart{
    CartItems : CartItem[];
}

enum OrderStatus{
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