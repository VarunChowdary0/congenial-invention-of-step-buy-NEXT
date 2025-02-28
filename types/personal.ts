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
    Admin = 1,
    User = 2,
    Vendor = 3,
    common = 4
}
