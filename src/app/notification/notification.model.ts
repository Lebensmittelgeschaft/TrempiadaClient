import { User } from '../user/user.model';


export class UserNotification {
    public constructor(public _id: string,
                       public user: string | User,
                       public content: string,
                       public creationDate: Date,
                       public isRead: boolean) {
        this._id = _id;
        this.user = user;
        this.creationDate = creationDate;
        this.isRead = isRead;
    }
}
