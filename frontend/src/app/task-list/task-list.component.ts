import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../service/event.service';
import {TaskService} from '../service/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks: any[];

  constructor(private http: HttpClient, private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTasks()
      .subscribe((response: any[]) => {
        this.tasks = response;
      });
  }

  deleteTask(task: any) {
    this.taskService.deleteTask(task)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

}
