export enum SearchTypes{
    FullSearch = 'FullSearch',
    Univeral = 'Univeral',
}

export interface Settings{
    HeadSearchMode : SearchTypes;
}