import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }
  public currentEventid: any;

  statusName = {
    o: 'Open',
    p: 'In Progress',
    d: 'Done'
  };

  getTasks() {
    return this.http.get('/api/task/list');
  }

  getTask(task: any) {
    return this.http.get('/api/task/' + task.id + '/get', task);
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
