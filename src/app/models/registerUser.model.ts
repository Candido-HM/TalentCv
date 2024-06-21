export class userRegisterModel {
    name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string

    constructor( data: any) {
        this.name = data.name;
        this.last_name = data.last_name;
        this.email = data.email;
        this.password = data.password;
        this.password_confirmation = data.password_confirmation;
    }
}