export class ubicationModel {
    id: number;
    iso_country: string;
    country: string;
    iso_state: string;
    state: string;
    city: string;

    constructor(data: any) {
        this.id = data?.id;
        this.iso_country = data?.iso_country;
        this.country = data?.country;
        this.iso_state = data?.iso_state;
        this.state = data?.state;
        this.city = data?.city;
    }
}