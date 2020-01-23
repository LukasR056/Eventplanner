import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../service/event.service';
import {ForumentryService} from '../service/forumentry.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {FormBuilder} from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TaskService} from '../service/task.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  events: any;
  event: any;
  forumentry: any;
  tasksOpen: Array<any>;
  tasksInProgress: Array<any>;
  tasksDone: Array<any>;
  userOptions;
  forumentries: any[];
  forumentryFormGroup;
  id2 = this.route.snapshot.paramMap.get('id');
  userId: any;
  // displayedColumns = ['id', 'name', 'datetime', 'description', 'location', 'public', 'eventplanner', 'invited' ];


  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private http: HttpClient, private eventService: EventService, private route: ActivatedRoute,
              private userService: UserService, private router: Router, private taskService: TaskService,
              private forumentryService: ForumentryService) {
  }

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    this.forumentryFormGroup = this.fb.group({
      content: [null],
      user: [this.userId],
      event: [this.id2],
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.tasksOpen = [];
    this.tasksInProgress = [];
    this.tasksDone = [];


    //this.forumentryService.getForumentries()
    //.subscribe((response: any[]) => {
    //this.forumentries = response;
    //});

    this.loadForumEntries(id);

    this.eventService.getEventWithId(id)
      .subscribe((response: any) => {
        this.event = response;
        this.filterTasks();
      });

    this.eventService.getEvents()
      .subscribe((response: any) => {
        this.events = response;
        this.filterTasks();
      });

    this.userService.retrieveUserOptions().subscribe((result) => {
      this.userOptions = result;
    });
  }

  private loadForumEntries(id) {
    this.forumentryService.getForumentryWithEventId(id)
      .subscribe((response: any) => {
        this.forumentries = response;
      });
  }

  createForumentry() {
    const id = this.route.snapshot.paramMap.get('id');
    const forumentry = this.forumentryFormGroup.value;
    this.forumentryService.createForumentry(forumentry)
      .subscribe((response: any) => {
        this.loadForumEntries(id);
      });
  }


  filterTasks() {
    this.event.tasks.forEach(task => {
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
    // console.log(event.container);

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

    this.taskService.updateTask(event.item.data).subscribe(() => {
    });
    // console.log(event.item.data);
  }

  updateEvent(id: any) {
    this.router.navigate(['/event-form/' + id]);
  }


  createTask(event: any) {
    this.taskService.currentEvent = event;
    this.router.navigate(['/task-form/']);
  }
}
