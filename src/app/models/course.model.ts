export class courseModel {
    id: number;
    course_name: string;
    company_training: string;
    start_date: Date;
    finish_date: Date;
    status: string;

    constructor ( data: any) {
        this.id = data.id || null;
        this.course_name = data.course_name || '';
        this.company_training = data.company_training || '';
        this.start_date = data.start_date || null;
        this.finish_date = data.finish_date || null;
        this.status = data.status || '';
    }
}