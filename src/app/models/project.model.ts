export class projectModel {
    id: number;
    project_name: string;
    start_date: Date;
    finish_date: Date;
    description: string;
    url_project: string;
    status: string;

    constructor (data: any) {
        this.id = data.id || null;
        this.project_name = data.project_name || '';
        this.start_date = data.start_date || null;
        this.finish_date = data.finish_date || null;
        this.description = data.description || '';
        this.url_project = data.url_project || '';
        this.status = data.status || '';
    }
}