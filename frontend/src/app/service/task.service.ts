import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  status = {
    o: 'Open',
    p: 'In Progress',
    d: 'Done'
  };

  getTasks() {
    return this.http.get('/api/task/list');
  }

  createTask(task: any) {
    return this.http.post('/api/task/create', task);
  }

  updateTask(task: any) {
    return this.http.put('/api/task/' + task.id + '/update', task);
  }

  deleteTask(task: any) {
    return this.http.delete('/api/task/' + task.id + '/delete');
  }
}
