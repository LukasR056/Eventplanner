import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }
  public currentEvent: any;

  statusName = {
    o: 'Open',
    p: 'In Progress',
    d: 'Done'
  };

  getTasks() {
    return this.http.get('/api/task/list');
  }

  getTask(id: any) {
    return this.http.get('/api/task/' + id + '/get');
  }

  getTaskWithUserId(id: any) {
    return this.http.get('/api/task/user/' + id + '/get', id);
  }

  createTask(task: any) {
    return this.http.post('/api/task/create', task);
  }

  updateTask(task: any) {
    return this.http.put('/api/task/' + task.id + '/update', task);
  }

  updateTaskStatus(task: any, newStatus: any) {
    return this.http.put('/api/task/' + task.id + '/update/status/' + newStatus, {});
  }

  deleteTask(task: any) {
    return this.http.delete('/api/task/' + task.id + '/delete');
  }

}
