import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) { }


getMedia(media: any) {
  return this.http.get('/api/media/' + media + '/get');
}

deleteMedia(media: any) {
  return this.http.delete('/api/media/' + media.id + '/delete');
}

}
