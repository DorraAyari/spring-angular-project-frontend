import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private sub$ = new BehaviorSubject<string>("");

  constructor() { }


  public getEmailFromStore(){
    return this.sub$.asObservable();
  }

  public setEmailFromStore(sub:string){
    this.sub$.next(sub);
  }
}
