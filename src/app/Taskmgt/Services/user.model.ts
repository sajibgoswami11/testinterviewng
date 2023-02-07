

import { Injectable } from "@angular/core";

export class User {
  constructor(
    public id: number,
   // public code: string,
    public name: string,
    //public created: Date
  ) {}
}

@Injectable({
  providedIn: "root"
})
export class UserAdapter {
  adapt(item: any): User {
    return new User(item.id, item.name);
  }
}