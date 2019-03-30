import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Album } from "../interfaces/Album";

@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {
  dellClass1: boolean = true;
  public num = 2
  constructor() { }
  // dellEvent() {
  //   this.dellClass = false
  // }
}
