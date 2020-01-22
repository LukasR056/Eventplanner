import {AfterContentChecked, Component, OnInit, TemplateRef, ViewChild,} from '@angular/core';
import {isSameDay, isSameMonth,} from 'date-fns';
import {Subject} from 'rxjs';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../service/event.service';
import {Router, ActivatedRoute} from '@angular/router';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  }
};

interface eventInterface {
  name: string;
  date: string;
}

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit, AfterContentChecked {

  constructor(private http: HttpClient, private eventService: EventService, private router: Router, private route: ActivatedRoute) {}

    @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  eventName;
  eventNames = [];
  eventDates = [];
  eventAll: eventInterface;
  eventAllList = [];
  all = [];
  allInterface: eventInterface;
  eventNames2;
  /*eventNames2 = this.eventService.getEvents().subscribe((response: any[]) => {
   (response.forEach(eventx => {this.eventNames.push(eventx.name);
                                this.eventDates.push(eventx.date);
                                this.eventAll = {name: eventx.name, date: eventx.date};
                                this.eventAllList.push(this.eventAll);

     }));

   for (let ev of this.eventAllList) {

     this.allInterface = {name: ev.name, date: ev.date};
     this.all.push(this.allInterface);

   }
});*/
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

      const data = this.route.snapshot.data;
      this.eventNames = data.events;
      this.eventNames2 = this.eventNames.forEach(eventx => {this.eventNames.push(eventx.name);
        this.eventDates.push(eventx.date);
        this.eventAll = {name: eventx.name, date: eventx.date};
        this.eventAllList.push(this.eventAll);

      });

      for (let ev of this.eventAllList) {

        this.allInterface = {name: ev.name, date: ev.date};
        this.all.push(this.allInterface);

      }


    }

  ngAfterContentChecked() {
    this.setEvent();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0);
      this.viewDate = date;
    }
  }

  setEvent() {

      if (this.events1.length === this.eventNames.length) {

      } else {

    for (const en of this.eventAllList) {

      this.events1.push({

        start: new Date(en.date),
        end: new Date(en.date),
        title: en.name,
        color: colors.red,
        allDay: true,

      });

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

