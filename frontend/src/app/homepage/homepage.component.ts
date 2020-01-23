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
  openTasks: any[];

  constructor(private http: HttpClient, private eventService: EventService, public taskService: TaskService, private fb: FormBuilder,
              private router: Router, private userService: UserService) {
  }

  ngOnInit() {

    this.username = localStorage.getItem('username');
    this.userId = Number(localStorage.getItem('user_id'));
    this.events = [];
    this.tasks = [];

    this.taskFormGroupStatus = this.fb.group({
      status: [null]
    });

    this.taskService.getTasks()
      .subscribe((response: any[]) => {
        for (const task of response) {
          if (task.responsible === this.userId && task.verified_by_planner && task.verified_by_participant) {
            this.tasks.push(task);
          }
        }
        this.tasks.sort((a, b) => (a.deadline_date > b.deadline_date) ? 1 : -1);
        this.openTasks = response.filter(task => task.responsible === this.userId && !task.verified_by_participant);
      });

    this.userService.getUserById(this.userId).subscribe(result => {
      this.user = result;
    });

    this.userService.getUserEventTask(this.userId).subscribe(result => {
      this.userTasksEvents = result;
      if (this.userTasksEvents.invited.length > 0) {
        this.openEvents = true;
      }
    });

    this.eventService.retrieveEvents().subscribe((result: any[]) => {
      // TODO: EVENTS SORTIEREN !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! .slice funktion
      // Nach Datum sortieren funktioniert noch nicht!!

      for (const event of result) {
        if (event.eventplanner === this.username || event.participants.includes(' ' + this.username)) {
          this.events.push(event);
        }
      }
      this.events = this.events.slice(0, 3);
      this.events.sort((a, b) => (a.date > b.date) ? 1 : -1);
    });

  }

  deleteEvent(event: any) {
    this.eventService.deleteEvent(event)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  filterTasks(userId, allTasks) {
    // allTasks
  }

  moveToEventDetail(id: any) {
    this.router.navigate(['/event-detail/' + id]);
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
