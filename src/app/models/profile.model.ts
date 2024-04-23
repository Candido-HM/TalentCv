export class profileModel {
    id: number;
    title: string;
    description: string;

    constructor (data: any) {
        this.id = data.id || 0;
        this.title = data.title || '';
        this.description = data.description || ''; 
    }
}