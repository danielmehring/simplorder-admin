export interface LoginData {
    auth: any,
    email: string,
    password: string
}

export interface Restaurant {
    name: string,
    createdAt: number,
    prefix: string,
    wantedPrefix?: string,
    restaurantID: number
}