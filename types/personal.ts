export interface User{
    id : string;
    name : string;
    email : string;
    phone : string;
    address : Address
}

export interface Address{
    id: string,
    userId: string,
    houseNo: string,
    buildingName: string,
    plotNo: string,
    roadNumber: string,
    colonyName: string,
    areaName: string,
    cityName: string,
    districtName: string,
    state: string,
    country: string,
    pin: string,
    alternatePhone: string,
    nameOfReciver : string
}

export enum UserType{
    Admin = "Admin",
    User = "User",
    Vendor = "Vendor",
    common = "common"
}
