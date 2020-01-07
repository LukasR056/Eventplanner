import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../service/event.service';
import {TaskService} from '../service/task.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  events: any[];
  tasks: any[];

  constructor(private http: HttpClient, private eventService: EventService, private taskService: TaskService) { }

  ngOnInit() {

    this.taskService.getTasks()
      .subscribe((response: any[]) => {
        this.tasks = response;
      });

    this.eventService.getFirstRow()
      .subscribe((response: any[]) => {
        this.events = response;
      });
  }


  deleteEvent(event: any) {
    this.eventService.deleteEvent(event)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

}
