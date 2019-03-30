import { Component, OnInit, ViewChild } from '@angular/core';
import {AlbumsService} from "../../services/albums.service";
import {AlbumEventsService} from "../../services/album-events.service";
import {Album} from "../../interfaces/Album";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-add-album-form',
  templateUrl: './add-album-form.component.html',
  styleUrls: ['./add-album-form.component.css']
})
export class AddAlbumFormComponent implements OnInit {
  album = {
    title: ''
  };
  editCard = false;
  inputVal = '';
  id: number;
  @ViewChild('addAlbumForm') form: NgForm;
  constructor(
    public albumService: AlbumsService,
    public albumEvents: AlbumEventsService
  ) { }

  ngOnInit() {
    this.albumEvents.albumEditEventObservableSubject.subscribe((data: Album) => {
      if (data.title) {
        this.editCard = true;
        this.inputVal = data.title
        this.id = data.id
        console.log('id', this.id)
      }
    });
    this.albumEvents.albumEditEventCancelObservableSubject.subscribe((data: Album) => {
      if (data.title) {
        this.editCard = false;

        this.inputVal = ''
      }
    });
  }
  onFormSubmit() {
    const newAlbum = {
      userId: 1,
      title: this.album.title
    };

    this.albumService.addNewAlbum(newAlbum).subscribe((data: Album) => {
      this.albumEvents.emitAddNewAlbum(data);
      this.form.resetForm();
    });
  }

  onFormEdit() {
    const editAlbum = {
      title: this.inputVal,
      id: this.id
    };

    this.albumService.editAlbum(editAlbum).subscribe((data: Album) => {
      console.log('edit form', data);
      this.form.resetForm();
      this.editCard = false;
      this.albumEvents.emitEditConfirm(data);
      
            
    });
  }
  
}
