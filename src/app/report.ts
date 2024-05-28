export class Report {
    id: string;
    name: string;
    number: number;
    villain: string;
    location: string;
    lat: number;
    lon: number;
    picture?: string;
    extraInfo: string;
    added_on: number;
    resolved: boolean;
    showMoreInfo: boolean = false; 
    distance: number = 0;
    count: number = 0;

    constructor(name:string, number:number, villain: string, location: string, lat: number, lon:number, picture: string, extraInfo: string, id: string, added_on: number, resolved: boolean){
        this.name = name;
        this.number = number;
        this.villain = villain;
        this.location = location;
        this.lat = lat;
        this.lon = lon;
        this.added_on = added_on;
        this.resolved = resolved;
        if(picture != ""){
            this.picture = picture;
        }
        this.extraInfo = extraInfo;
        this.id = id;
    }
}