import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../../services/albums.service';
import { Album } from "../../interfaces/Album";
import {AlbumEventsService} from "../../services/album-events.service";

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css']
})
export class AlbumsListComponent implements OnInit {
  albums: Album[];

  constructor(
    public albumService: AlbumsService,
    public albumEvents: AlbumEventsService
  ) { }

  ngOnInit() {
    this.albumService.getAlbums().subscribe((data: Album[]) => {
      this.albums = data;
      console.log(data);
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('complete');
    });

    this.albumEvents.albumAddEventObservableSubject.subscribe((data: Album) => {
      console.log('AlbumsListComponent:',data);
      if (data.title) {
        this.albums.unshift(data);
      }
    });
    this.albumEvents.albumDelEventObservableSubject.subscribe((data: Album) => {
      console.log('AlbumsListDel:',data);
      if (data.title) {
        this.albums.forEach((element, index, array) => {
          if (element.id == data.id) {
            array.splice(index, 1)
          }
        });
        
      }
    });
  }
}
