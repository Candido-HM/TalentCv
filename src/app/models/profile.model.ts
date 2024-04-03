export class profileModel {
    title: string = '';
    description: string = ''

    constructor (data: any) {
        this.title = data.title;
        this.description = data.description; 
    }
}