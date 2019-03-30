import { Component, OnInit, Input } from '@angular/core';
import {Album} from "../../interfaces/Album";
import {AlbumsService} from "../../services/albums.service";
import {AlbumEventsService} from "../../services/album-events.service";
// import { AlertMessageComponent } from "../alert-message/alert-message.component"
@Component({
  selector: 'app-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.css']
})
export class AlbumItemComponent implements OnInit {
  @Input() item: Album;
  edit = false;
  constructor(
    public albumService: AlbumsService,
    public albumEvents: AlbumEventsService,
    // public alert: AlertMessageComponent
  ) { }
  editStart() {
    const editAlbum = this.item
    this.edit = true;
    this.albumService.editAlbum(editAlbum).subscribe((data: Album) => {
    this.albumEvents.emitEditAlbum(data);
    
    });
  }
  editCancel() {
    const editAlbum = this.item
    this.edit = false;
    this.albumService.cancelEditAlbum(editAlbum).subscribe((data: Album) => {
    this.albumEvents.emitEditCancel(data);
    console.log(this.item, 'item')
    });
  }
  ngOnInit() {

    this.albumEvents.albumEditEventConfirmObservableSubject.subscribe((data: Album) => {
      console.log('confirm edit items:',this.item);
      if (data.id == this.item.id) {
        this.item.title = data.title
        this.edit = false;
      }
    });
  }

  onItemDel() {
    const delAlb = this.item
    console.log(delAlb)
    this.albumService.deleteAlbum(delAlb).subscribe((data: Album) => {
      this.albumEvents.emitDelAlbum(data);
    
    });
 
  }
}
