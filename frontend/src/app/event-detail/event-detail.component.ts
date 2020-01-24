import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../service/event.service';
import {ForumentryService} from '../service/forumentry.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {FormBuilder} from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TaskService} from '../service/task.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
  providers: [DatePipe]
})
export class EventDetailComponent implements OnInit {
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

  // displayedColumns = ['id', 'name', 'datetime', 'description', 'location', 'public', 'eventplanner', 'invited' ];


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


    //this.forumentryService.getForumentries()
    //.subscribe((response: any[]) => {
    //this.forumentries = response;
    //});

    this.loadForumEntries(id);

    this.eventService.getEventWithId(id)
      .subscribe((response: any) => {
        this.event = response;
        console.log(this.event);
        this.filterTasks();
        this.pictures = response.pictures;
        console.log('piiiics: ' + this.pictures);
      });

    this.userService.retrieveUserOptions().subscribe((result) => {
      this.userOptions = result;
    });
  }

  private loadForumEntries(id) {
    this.forumentryService.getForumentryWithEventId(id)
      .subscribe((response: any) => {
        this.forumentries = response;
        // console.log(this.forumentries);
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

  showDateInbetweenForumentries(index: number): boolean {
    const currentEntry = this.datepipe.transform(this.forumentries[index].datetime, 'dd/MM/yyyy');
    const previousEntry = this.forumentries[index - 1] ? this.datepipe.transform(this.forumentries[index - 1].datetime,
      'dd/MM/yyyy') : undefined;
    return currentEntry != previousEntry;
  }


  filterTasks() {
    this.taskService.getTasks().subscribe((response: any[]) => {
      this.eventTasks = response.filter(task => this.event.tasks.includes(task.id));
      console.log(this.eventTasks);
      this.eventTasks.forEach(task => {
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
    event.item.data.event = this.event.id;
    console.log(event.item.data);
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
