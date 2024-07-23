export class ubicationModel {
    id: number;
    country: string;
    state: string;
    city: string;

    constructor(data: any) {
        this.id = data?.id;
        this.country = data?.country;
        this.state = data?.state;
        this.city = data?.city;
    }
}