import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../service/event.service';
import {ActivatedRoute} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {forEachComment} from 'tslint';
import {TaskService} from '../service/task.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  event: any;
  tasksOpen: Array<any>;
  tasksInProgress: Array<any>;
  tasksDone: Array<any>;
  // displayedColumns = ['id', 'name', 'datetime', 'description', 'location', 'public', 'eventplanner', 'invited'];


  constructor(private http: HttpClient, private eventService: EventService, private route: ActivatedRoute,
              private taskService: TaskService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.tasksOpen = [];
    this.tasksInProgress = [];
    this.tasksDone = [];

    this.eventService.getEventWithId(id)
      .subscribe((response: any) => {
        this.event = response;
        this.filterTasks();
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

    this.taskService.updateTask(event.item.data).subscribe(() => { });
    // console.log(event.item.data);
  }

}
