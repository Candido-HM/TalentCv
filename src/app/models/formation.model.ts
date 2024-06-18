export class formationModel {
    id: number;
    university_name: string;
    professional_area: string;
    start_date: Date;
    finish_date: Date;
    status: string;
    profile_id: number;

    constructor (data: any) {
        this.id = data.id || null;
        this.university_name = data.university_name || '';
        this.professional_area = data.professional_area || '';
        this.start_date = data.start_date || null;
        this.finish_date = data.finish_date || null;
        this.status = data.status || '';
        this.profile_id = data.profile_id || null;
    }
}