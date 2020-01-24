import {AfterContentChecked, Component, OnInit, TemplateRef, ViewChild,} from '@angular/core';
import {isSameDay, isSameMonth,} from 'date-fns';
import {Subject} from 'rxjs';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../service/event.service';
import {Router} from '@angular/router';

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
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit, AfterContentChecked {

  constructor(private http: HttpClient, private eventService: EventService, private router: Router) {}

    @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  eventName;
  //event = this.eventService.getEventWithId(2).subscribe(value => {this.eventName = value.name;
                                                                  // console.log('eventname: ' + this.eventName);
                                                                  // console.log('value.name: ' + value.name)} );

  eventNames = [];
  eventDates = [];
  eventAll: eventInterface;
  eventAllList = [];
  all = [];
  allInterface: eventInterface;

 /* events = this.eventService.getEvents().subscribe(value => {
    for (const e in value) {
      console.log('e :' + e);
    }
    console.log('sollte gehen ' + value);
    console.log('event names: ' + this.eventNames);
  }); */
 eventNames2 = this.eventService.getEvents().subscribe((response: any[]) => {
   (response.forEach(eventx => {this.eventNames.push(eventx.name);
                                // this.eventYears.push(eventx.date.year);
                                // console.log('jahr: ' + eventx.date[0] + eventx.date[1] + eventx.date[2] + eventx.date[3]);
                                // this.eventYears.push(eventx.date[0] + eventx.date[1] + eventx.date[2] + eventx.date[3]);
                                this.eventDates.push(eventx.date);
                                // this.eventAll.name = eventx.name;
                                // this.eventAll.date = eventx.date;
                                this.eventAll = {name: eventx.name, date: eventx.date};
                                this.eventAllList.push(this.eventAll);

     }));
   /*console.log('drinnen: ' + this.eventNames);
   console.log('drinnen: ' + this.eventDates);
   console.log('ALLES INTERFACE: ' + this.eventAll);
   console.log('ALLES ALLES: ' + this.eventAllList[0].name);*/

   for (let ev of this.eventAllList) {

     //console.log('ALLE NAMEN ' + ev.name);
     //console.log(ev);

     this.allInterface = {name: ev.name, date: ev.date};
     this.all.push(this.allInterface);

     // console.log('ALL ALL ALL ' + this.all);
   }
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

    }

  ngAfterContentChecked() {
    this.setEvent();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      // console.log('eventName unten ' + this.eventName);
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0);
      this.viewDate = date;
    }
  }

  setEvent() {

      if (this.events1.length === this.eventNames.length) {
        console.log('gleich lang');
      } else {

    for (const en of this.eventAllList) {

      this.events1.push({

        start: new Date(en.date),
        end: new Date(en.date),
        title: en.name,
        color: colors.red,
        allDay: true,

      });
      // console.log(en);
      this.refresh.next();
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

