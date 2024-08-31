export class userModel {
    id: number;
    name: string;
    last_name: string;
    // country: string;
    // city: string ;
    email: string = '';
    phone: {
        id: number;
        prefix: string;
        phone_number: number;
    };
    // portfolio: {
    //     id: number;
    //     url_portfolio: string;
    // };
    linkedin: {
        id: number;
        url_linkedin: string;
    };
    link: {
        id: number;
        url_links: string;
    };
    github: {
        id: number;
        url_github: string;
    }

    constructor(data: any) {
        this.id = data.id || 0;
        this.name = data.name || '';
        this.last_name = data.last_name || null;
        // this.country = data.country || null;
        // this.city = data.city || null;
        this.email = data.email || '';
        this.phone = data.phone || {
            id: null,
            prefix: null,
            phone_number: null
        };
        // this.portfolio = data.portfolio || { 
        //     id: null, 
        //     url_portfolio: null 
        // };
        this.linkedin = data.linkedin || {
            id: null,
            url_linkedin: null
        };
        this.link = data.link || {
            id: null,
            url_links: null
        };
        this.github = data.github || {
            id: null,
            url_github: null
        }
    }
}