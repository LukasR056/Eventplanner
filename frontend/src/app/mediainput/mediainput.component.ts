import {Component, ElementRef, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../service/user.service';
import {forkJoin} from 'rxjs';
import {MediaService} from '../service/media.service';
import {Router} from '@angular/router';

export interface IMedia {
  id?: number;
  original_file_name?: string;
  content_type?: string;
  size?: number;
}

@Component({
  selector: 'app-mediainput',
  templateUrl: './mediainput.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MediainputComponent),
      multi: true
    }
  ]
})
export class MediainputComponent implements OnInit, ControlValueAccessor {
  @Input() public parentObj = false;
  @Input() public tooManyPics = false;

  constructor(private userService: UserService, private http: HttpClient, elm: ElementRef,
              private mediaService: MediaService, private router: Router) {
  }

  pictures: number[];
  friendOptions: any;
  userId: any;
  user: any;
  accept = '';
  resourceUrl = '/api/media';
  initializing = true;
  medias: IMedia[];
  uploader: FileUploader;
  picIsAlreadyThere: boolean;
  picIsAlreadyUploaded: boolean;
  //entryInDB: boolean;
  onChange = (medias: number[]) => {
    // empty default
  };

  ngOnInit() {
    this.uploader = new FileUploader({
      url: this.resourceUrl,
      authToken: 'Bearer ' + localStorage.getItem('access_token'),
      autoUpload: true,
    });
    this.uploader.onBeforeUploadItem = (item: FileItem) => {
      if (!this.medias) {
        this.medias = [];
      }
      this.medias.push({
        content_type: item.file.type,
        original_file_name: item.file.name,
        size: item.file.size
      });
    };
    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      const uploadedMedia = <IMedia> JSON.parse(response);
      if (this.parentObj == true) {
        this.picIsAlreadyUploaded = false;
      } else {
        this.picIsAlreadyUploaded = true;
      }
      console.log('ispicuploaded? ' + this.picIsAlreadyUploaded);
      this.medias.find(media => !media.id && media.original_file_name === uploadedMedia.original_file_name).id = uploadedMedia.id;
    };
    this.uploader.onCompleteAll = () => {
      this.onChange(this.medias.map((m) => {
        return m.id;
      }));
    };
    this.userId = Number(localStorage.getItem('user_id'));
    //this.pictures = this.userId.pictures;
    this.userService.retrieveUserOptions().subscribe((result) => {
      this.friendOptions = result;
    });
    this.userService.getUserById(this.userId)
      .subscribe((response: any) => {
        this.user = response;
        this.pictures = response.pictures;
        if (this.pictures.length >= 1 && this.parentObj == false) {
          this.picIsAlreadyThere = true;
          console.log('picture länge: ' + this.pictures.length);
          console.log('parentObj ' + this.parentObj);
        }

      });
  }

  deleteAll(index: any, media: any) {

    this.medias.splice(index, 1);
    this.picIsAlreadyUploaded = false;
    this.onChange(this.medias.map((m) => {
      return m.id;
    }));
    this.picIsAlreadyUploaded = false;
    console.log('uploaded?' + this.picIsAlreadyUploaded);
    this.mediaService.deleteMedia(media)
      .subscribe(() => {
        window.location.reload();

      });
  }

  downloadMedia(media: IMedia): void {
    this.http.get(`${this.resourceUrl}/${media.id}`, {responseType: 'blob'}).subscribe((blob: Blob) => {
      const fileURL = URL.createObjectURL(blob);
      const a = <HTMLAnchorElement> document.createElement('a');
      a.href = fileURL;
      a.download = media.original_file_name;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
      }, 100);
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // not implemented
  }

  setDisabledState(isDisabled: boolean): void {
    // not implemented
  }

  writeValue(mediaIds: any): void {
    if (!mediaIds || !mediaIds.length) {
      this.initializing = false;
    }
    forkJoin(mediaIds.map((id) => {
      return this.http.get(`${this.resourceUrl}/${id}/get`);
    })).subscribe((medias) => {
      this.medias = medias;
      this.initializing = false;
    });
  }


}
