export class userModel {
    name: string;
    last_name: string | null = null;
    country: string | null = null;
    city: string | null  = null;
    email: string = '';

    constructor(data: any) {
        this.name = data.name || '';
        this.last_name = data.last_name || null;
        this.country = data.country || null;
        this.city = data.city || null;
        this.email = data.email || '';
    }
}