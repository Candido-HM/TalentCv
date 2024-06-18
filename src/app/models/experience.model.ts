export class experienceModel {
    id: number;
    cargo: string;
    company_name: string;
    start_date: Date;
    finish_date: Date;
    description: string;
    status: string;
    profile_id: number;

    constructor(data: any) {
        this.id = data.id || null;
        this.cargo = data.cargo || '';
        this.company_name = data.company_name || '';
        this.start_date = data.start_date || null;
        this.finish_date = data.finish_date || null;
        this.description = data.description || '';
        this.status = data.status || '';
        this.profile_id = data.profile_id || null;
    }
}