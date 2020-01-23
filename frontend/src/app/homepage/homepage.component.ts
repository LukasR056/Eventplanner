import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../service/event.service';
import {TaskService} from '../service/task.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  events: Array<any>;
  taskFormGroupStatus;
  tasks: any[];
  user;
  username: string;
  userId: any;
  userTasksEvents: any;
  openEvents = false;

  constructor(private http: HttpClient, private eventService: EventService, public taskService: TaskService, private fb: FormBuilder,
              private router: Router, private userService: UserService) {
  }

  ngOnInit() {

    this.username = localStorage.getItem('username');
    this.userId = localStorage.getItem('user_id');
    this.events = [];

    this.taskFormGroupStatus = this.fb.group({
      status: [null]
    });

    this.taskService.getTasks()
      .subscribe((response: any[]) => {
        this.tasks = response;
        this.taskFormGroupStatus.patchValue(response);
      });

    this.userService.getUserById(this.userId).subscribe(result => {
      this.user = result;
    });

    this.userService.getUserEventTask(this.userId).subscribe(result => {
      this.userTasksEvents = result;
      if (this.userTasksEvents.invited.length > 0) {
        this.openEvents = true;
        console.log(this.openEvents);
      }
    });

    this.eventService.retrieveEvents().subscribe((result: any[]) => {
      // TODO: EVENTS SORTIEREN UND AUF ANZAHL BESCHRÄNKEN (z.B. 4) !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! .slice funktion
      for (const event of result) {
        if (event.eventplanner === this.username || event.invited.includes(' ' + this.username)) {
          this.events.push(event);
        }
      }
      this.events = this.events.sort((a, b) => b.date - a.date);
    });

  }

  deleteEvent(event: any) {
    this.eventService.deleteEvent(event)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  saveTask(task, taskStatus) {
    task.status = taskStatus;
    this.taskService.updateTask(task);
  }

  updateStatus(task, taskStatus) {
    this.taskService.updateTaskStatus(task, taskStatus).subscribe(() => {
    });
  }
}
