import { User } from '../users/user.model';

export class Ride {
    public constructor(public _id: string,
                       public driver: string | User,
                       public from: string,
                       public to: string,
                       public maxRiders: number,
                       public creationDate: Date,
                       public departureDate: Date,
                       public riders: string | User[],
                       public isDeleted: boolean) {
        this._id = _id;
        this.driver = driver;
        this.from = from;
        this.to = to;
        this.maxRiders = maxRiders;
        this.creationDate = creationDate;
        this.departureDate = departureDate;
        this.riders = riders;
        this.isDeleted = isDeleted;
    }
}
