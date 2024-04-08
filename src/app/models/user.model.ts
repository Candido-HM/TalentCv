export class userModel {
    id: number;
    name: string;
    last_name: string;
    country: string;
    city: string ;
    email: string = '';

    constructor(data: any) {
        this.id = data.id || 0;
        this.name = data.name || '';
        this.last_name = data.last_name || null;
        this.country = data.country || null;
        this.city = data.city || null;
        this.email = data.email || '';
    }
}