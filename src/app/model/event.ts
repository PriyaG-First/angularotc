export class Event {
    constructor(public id:number,
        public eventname:string,
        public details:string,
        public startdate:Date,
        public duration:number,
        public trainer:string,
        public domain:string,
        public status:string,
        public location:string,
        public multifilename:File,
       // public filename:string
        ){}
}
