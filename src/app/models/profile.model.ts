export class profileModel {
    id: number;
    title: string;
    description: string;

    constructor (data: any) {
        this.id = data.id || null;
        this.title = data.title || '';
        this.description = data.description || ''; 
    }
}