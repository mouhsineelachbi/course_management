export class User {
    
    private _id?:        number;
    private _email?:     string;
    private _username?:  string;
    private _password?:  string;


    set id(id: number){
        this._id = id;
    }

    set email(email: string){
        this._email = email;
    }

    set username(username: string){
        this._username = username;
    }

    set password(password: string){
        this._password = password;
    }

    get id(): any{
        return this._id;
    }

    get username(): any{
        return this._username;
    }

    get email(): any{
        return this._email;
    }

    get password(): any{
        return this._password;
    }
}
