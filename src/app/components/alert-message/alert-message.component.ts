import { Component, OnInit } from '@angular/core';
import {AlbumsService} from "../../services/albums.service";

import { Album } from "../../interfaces/Album";
import {AlbumEventsService} from "../../services/album-events.service";
@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit {
  dellClass: boolean = false;
  editClass: boolean = false;
  addClass: boolean = false;
  albums: Album[];
  mess: string;
  id: number;

  constructor(
    public albumService: AlbumsService,
    public albumEvents: AlbumEventsService
  ) { }

  ngOnInit() {
    this.albumEvents.albumAddEventObservableSubject.subscribe((data: Album) => {
      console.log('AlertComponent:',data);
      if (data.title) {
        this.mess = 'added'
        this.id = data.id;
        this.addClass = true;
      }
    });

    this.albumEvents.albumDelEventObservableSubject.subscribe((data: Album) => {
      console.log('AlbumsListDel:',data);
      if (data.title) {
        this.mess = 'removed'
        this.id = data.id;
        this.dellClass = true;
        
      }
    });
    this.albumEvents.albumEditEventConfirmObservableSubject.subscribe((data: Album) => {
      console.log('confirm edit items:',data);
      if (data.title) {
        this.mess = 'edited'
        this.id = data.id;
        this.editClass = true;
        
      }
    });
  }
  ngDoCheck() {

    if(this.addClass || this.dellClass || this.editClass){
      setTimeout(() => {
      this.dellClass = false;
      this.editClass = false;
      this.addClass = false;
    }, 2000)
    }
    
  }
  // changeState() {
  //   this.dellClass = true;
  // }
}
