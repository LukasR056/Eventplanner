import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagsService {



  constructor(private http: HttpClient) { }



  retrieveTagOptions() {
    return this.http.get <any[]>('/api/tag/list/');
  }


  getTags() {
    return this.http.get('/api/tag/list');
  }

  createTag(tag: any) {
    return this.http.post('/api/tag/create', tag);
  }

  updateTag(tag: any) {
    return this.http.put('/api/tag/' + tag.id + '/update', tag);
  }

  deleteTag(tag: any) {
    return this.http.delete('/api/tag/' + tag.id + '/delete');
  }
}
