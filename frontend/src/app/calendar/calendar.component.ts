import {AfterContentChecked, Component, TemplateRef, ViewChild,} from '@angular/core';
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
  id: number;
  name: string;
  date: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterContentChecked {
    username: string;
    userId: number;

  constructor(private http: HttpClient, private eventService: EventService, private router: Router) {
  }

  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  eventNames = [];
  eventDates = [];
  eventAll: eventInterface;
  eventAllList = [];
  all = [];
  allInterface: eventInterface;
  clicked = false;
  filteredEvents: any[];

  events = this.eventService.getEvents().subscribe((response: any[]) => {

    this.username = localStorage.getItem('username');
    this.userId = Number(localStorage.getItem('user_id'));

    this.filteredEvents = response.filter(event => event.eventplanner == this.username || event.participants.includes(' ' + this.username) );

    this.filteredEvents.forEach(eventx => {
      this.eventNames.push(eventx.name);
      this.eventDates.push(eventx.date);
      this.eventAll = {id: eventx.id, name: eventx.name, date: eventx.date};
      this.eventAllList.push(this.eventAll);
    });

    for (let ev of this.eventAllList) {
      this.allInterface = {id: ev.id, name: ev.name, date: ev.date};
      this.all.push(this.allInterface);
    }
  });

  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  events1: Array<CalendarEvent> = [];
  activeDayIsOpen = false;

  ngAfterContentChecked() {
    this.setEvent();
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0);
      this.viewDate = date;
    }
  }

  setEvent() {

    for (const event of this.eventAllList) {
      if (this.events1.length === this.eventNames.length) {
      } else {
        this.events1.push({
          start: new Date(event.date),
          end: new Date(event.date),
          title: event.name,
          color: colors.red,
          allDay: true,
          id: event.id
        });
        this.refresh.next();
      }
      if (this.clicked) {
        this.router.navigate(['/event-detail/' + event.id]);
      }
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  eventClicked(): void {
    this.clicked = true;
  }
}
