import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import {Album} from "../interfaces/Album";

@Injectable({
  providedIn: 'root'
})
export class AlbumEventsService {
  private albumAddEventSource = new BehaviorSubject({});
  public  albumAddEventObservableSubject = this.albumAddEventSource.asObservable();
  private albumDelEventSource = new BehaviorSubject({});
  public  albumDelEventObservableSubject = this.albumDelEventSource.asObservable();
  private albumEditEventSource = new BehaviorSubject({});
  public  albumEditEventObservableSubject = this.albumEditEventSource.asObservable();
  private albumEditCancelEventSource = new BehaviorSubject({});
  public  albumEditEventCancelObservableSubject = this.albumEditCancelEventSource.asObservable();
  private albumEditConfirmEventSource = new BehaviorSubject({});
  public  albumEditEventConfirmObservableSubject = this.albumEditConfirmEventSource.asObservable();
  constructor() {}

  emitAddNewAlbum(value: Album) {
    console.log('Service:', value);
    this.albumAddEventSource.next(value);
  }
  emitDelAlbum(value: Album) {
    console.log('del:', value);
    this.albumDelEventSource.next(value);
  }
  emitEditAlbum(value: Album) {
    console.log('edit:', value);
    this.albumEditEventSource.next(value);
  }
  emitEditCancel(value: Album) {
    console.log('cancel from event', value);
    this.albumEditCancelEventSource.next(value);
  }
  emitEditConfirm(value: Album) {
    console.log('confirm from event', value);
    this.albumEditConfirmEventSource.next(value);
  }
}
