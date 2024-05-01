export interface ValuationRequest {
    model:string | undefined,
    description?: string,
    category: number, 
    beds: number,
    livings: number,
    wc: number, 
    area: number, 
    street_width: number,
    kitchen: number,
    ac: number,
    furnished: number,
    lat: number, 
    lng: number, 
    city_id?: number,
    district_id?: number,
    rent_period:number,
    width: number, 
    length: number, 
    daily_rentable: number
    moderate_neighbours?: number
    high_neighbours?: number
}