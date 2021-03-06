import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../service/event.service';
import {ForumentryService} from '../service/forumentry.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {FormBuilder} from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TaskService} from '../service/task.service';
import {DatePipe} from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
  providers: [DatePipe]
})
// tslint:disable:triple-equals
export class EventDetailComponent implements OnInit {
  // @ts-ignore
  @ViewChild('scrollMe') scrollMe: ElementRef;

  event: any;
  // Tasks for bottom Board
  eventTasks: any[];
  tasksOpen: Array<any>;
  tasksInProgress: Array<any>;
  tasksDone: Array<any>;

  userOptions;
  forumentry: any;
  forumentries: any[];
  forumentryFormGroup;
  id2 = this.route.snapshot.paramMap.get('id');
  userId: any;
  pictures: number[];
  username: any;
  private updatedTask: any;

  // picture specific information
  pictureId;
  close = false;

  sub: Subscription;


  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private http: HttpClient, private eventService: EventService, private route: ActivatedRoute,
              private userService: UserService, private router: Router, private taskService: TaskService,
              private forumentryService: ForumentryService, private datepipe: DatePipe) {
  }

  ngOnInit() {
    this.userId = Number(localStorage.getItem('user_id'));
    this.username = localStorage.getItem('username');
    this.forumentryFormGroup = this.fb.group({
        content: [null],
        user: [this.userId],
        event: [this.id2],
      }
    );
    const id = this.route.snapshot.paramMap.get('id');
    this.tasksOpen = [];
    this.tasksInProgress = [];
    this.tasksDone = [];

    this.loadForumEntries(id);
    const source = interval(10000);
    source.subscribe(val => this.loadForumEntries(id));

    this.eventService.getEventWithId(id)
      .subscribe((response: any) => {
        this.event = response;
        this.filterTasks();
        this.pictures = response.pictures;
        this.pictureId = this.pictures[0];
      });

    this.userService.retrieveUserOptions().subscribe((result) => {
      this.userOptions = result;

    });
  }

  private loadForumEntries(id) {
    // @ts-ignore
    this.forumentryService.getForumentryWithEventId(id)
      .subscribe(async (response: any) => {
        if ( (this.forumentries ? this.forumentries.length : -1) != response.length) {
          this.forumentries = response;

          // sonst ist scrollHeight nicht die tatsächliche Höhe nach der Änderung
          await new Promise( resolve => setTimeout(resolve, 100) );

          const scrollMe = document.getElementById('scrollMe');
          scrollMe.scrollTop = scrollMe.scrollHeight;
        }
      });
  }

  createForumentry() {
    const id = this.route.snapshot.paramMap.get('id');
    const forumentry = this.forumentryFormGroup.value;
    if (forumentry.content && forumentry.content.trim()) {
      this.forumentryService.createForumentry(forumentry)
        .subscribe((response: any) => {
          this.loadForumEntries(id);
        });
      this.forumentryFormGroup.patchValue({content: ''});
    }
  }

  showDateInbetweenForumentries(index: number): boolean {
    const currentEntry = this.datepipe.transform(this.forumentries[index].datetime, 'dd/MM/yyyy');
    const previousEntry = this.forumentries[index - 1] ? this.datepipe.transform(this.forumentries[index - 1].datetime,
      'dd/MM/yyyy') : undefined;
    return currentEntry != previousEntry;
  }


  filterTasks() {
    this.taskService.getTasks().subscribe((response: any[]) => {
      this.eventTasks = response.filter(task => this.event.tasks.includes(task.id)
        && task.verified_by_planner && task.verified_by_participant);
      this.eventTasks.forEach(task => {
        task.responsible = task.responsible.id;
        switch (task.status) {
          case 'o':
            this.tasksOpen.push(task);
            break;
          case 'i':
            this.tasksInProgress.push(task);
            break;
          case 'd':
            this.tasksDone.push(task);
            break;
        }
      });
    });
  }

  saveDroppedItem(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    switch (event.container.id) {
      case 'listToDo':
        event.item.data.status = 'o';
        break;
      case 'listInProgress':
        event.item.data.status = 'i';
        break;
      case 'listDone':
        event.item.data.status = 'd';
        break;
    }
    this.updatedTask = event.item.data;
    this.updatedTask.event = this.event.id;

    this.taskService.updateTask(this.updatedTask).subscribe(() => {
    });
  }

  updateEvent(id: any) {
    this.router.navigate(['/event-form/' + id]);
  }


  createTask(event: any) {
    this.taskService.currentEvent = event;
    this.router.navigate(['/task-form/']);
  }


  updateTask(task: any, event: any) {
    this.taskService.currentEvent = event;
    this.router.navigate(['/task-form/' + task.id]);
  }

  deleteTask(task: any) {
    switch (task.status) {
      case 'o':
        const indexOfcanceledTaskOpen = this.tasksOpen.indexOf(task);
        this.tasksOpen.splice(indexOfcanceledTaskOpen, 1);
        task.event = task.id;
        this.taskService.deleteTask(task).subscribe();
        break;
      case 'i':
        const indexOfcanceledTaskInProgress = this.tasksInProgress.indexOf(task);
        this.tasksInProgress.splice(indexOfcanceledTaskInProgress, 1);
        task.event = task.id;
        this.taskService.deleteTask(task).subscribe();
        break;
      case 'd':
        const indexOfcanceledTask = this.tasksDone.indexOf(task);
        this.tasksDone.splice(indexOfcanceledTask, 1);
        task.event = task.id;
        this.taskService.deleteTask(task).subscribe();
        break;
    }


  }

  deleteEvent(event: any) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(event)
        .subscribe(() => {
          this.router.navigate(['/event-list/']);
        });
    }
  }

  participateEvent(event: any) {
    event.participants.push(this.userId);
    this.eventService.updateEvent(event).subscribe(() => {
      this.router.navigate(['/event-detail/' + event.id]);
    });
  }

  bigPicture(pictureId) {
    if (this.pictureId == pictureId) {
      this.close = !this.close;
    } else {
      this.pictureId = pictureId;
    }
  }
}
