export interface feature{
    Id : string;
    Attribute : string;
    Value : string;
}

export interface review{
    Id : string;
    ProductId : string;
    Rating : number;
    date : string;
    ReviewerId : string;
    Media : Media[];
    Upvotes : number;
    Downvotes : number;
}

enum MediaType {
    Photo = "Photo",
    Video = "Video"
}


export interface Media{
    Id : string;
    Type : MediaType,
    Link : string
}

export interface Product{
    Id : string;
    Title : string;
    Rating : number;
    Quatity : number;
    ActualPrice : number;
    Price : number;
    Discount : number;
    Description : string;

    Media : Media[];
    Features : feature[];
    Reviews : review[];
}