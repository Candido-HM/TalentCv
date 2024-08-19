export class profileModel {
    id: number;
    title: string;
    description: string;
    template_id: number;

    constructor (data: any) {
        this.id = data.id || 0;
        this.title = data.title || '';
        this.description = data.description || ''; 
        this.template_id = data.template_id || '';
    }
}