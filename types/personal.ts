export interface User{
    Id : string;
    Name : string;
    Email : string;
    Phone : string;
    Address : Address
}

export interface Address{
    HouseNo : string;
    BuildingName : string;
    PlotNo :string;
    RoadNumber : string;
    ColonyName : string;
    AreaName : string;
    CityName : string;
    DistrictName : string ;
    State : string;
    Country : string;
    Pin : number;
    Phone : string;
    Name : string;
}