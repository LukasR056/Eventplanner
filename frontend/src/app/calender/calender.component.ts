import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  AfterContentChecked,
} from '@angular/core';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarView
} from 'angular-calendar';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../service/event.service';
import {Router} from '@angular/router';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  }
};

@Component({
  selector: 'app-calender',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit, AfterContentChecked {

  constructor(private http: HttpClient, private eventService: EventService, private router: Router) {}

    @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  eventName;
  doofus = 0;
  event = this.eventService.getEventWithId(2).subscribe(value => {this.eventName = value.name;
                                                                  console.log('eventname: ' + this.eventName);
                                                                  console.log('value.name: ' + value.name)} );

  eventNames = [];
  eventYears = [];

 /* events = this.eventService.getEvents().subscribe(value => {
    for (const e in value) {
      console.log('e :' + e);
    }
    console.log('sollte gehen ' + value);
    console.log('event names: ' + this.eventNames);
  }); */
 eventNames2 = this.eventService.getEvents().subscribe((response: any[]) => {
   (response.forEach(eventx => {this.eventNames.push(eventx.name);
                                // this.eventNames.push(eventx.date.year);
                                console.log('jahr: ' + eventx.date);
     }));
   console.log('drinnen: ' + this.eventNames);
});


  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  events1: Array<CalendarEvent> = [];

  activeDayIsOpen = false;
    ngOnInit() {
      /*this.eventService.getEvents()
        .subscribe((response: any[]) => {
          this.event = response;
        });

      this.eventName = this.event.name;*/
      this.doofus = 1;
    }

  ngAfterContentChecked() {
    this.setEvent();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      console.log('eventName unten ' + this.eventName);
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0);
      this.viewDate = date;
    }
  }

  setEvent() {

      if (this.events1.length === this.eventNames.length) {
        console.log('gleich lang');
      } else {

    for (const en of this.eventNames) {

      this.events1.push({

        start: new Date(2019, 12, 8),
        end: new Date(2019, 12, 8),
        title: en,
        color: colors.red,
        allDay: true,

      });
      // console.log(en);
    }
      }

    }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}

