import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService {
  // activatedEmitter = new EventEmitter<boolean>();
  // only use subject to communicate across components, through services
  activatedEmitter = new Subject<boolean>();
}