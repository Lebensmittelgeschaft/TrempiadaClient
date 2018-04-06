export class User {
    public constructor (public _id: string,
                        public firstname: string,
                        public lastname: string,
                        public email: string,
                        public job: string,
                        public isDeleted: boolean) {
        this._id = _id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.job = job;
        this.isDeleted = isDeleted;
    }
}
