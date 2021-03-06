import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TagsService} from '../service/tags.service';
import {EventService} from '../service/event.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
// tslint:disable:triple-equals
export class TagListComponent implements OnInit {
  tags: any[];
  selectable = true;
  events: any [];
  showEvents: any[];
  private username: any;
  private userId: any;

  // Searchbar
  input = new FormControl();
  filteredEventList: Observable<any[]>;
  private showAllEvents: any[];


  constructor(private tagService: TagsService, private  eventService: EventService, private router: Router) {
  }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.userId = Number(localStorage.getItem('user_id'));
    this.tagService.getTags()
      .subscribe((response: any[]) => {
        this.tags = response;
        this.tags.sort((a, b) => (a.name > b.name) ? 1 : -1);
      });
    this.eventService.getEventsId()
      .subscribe((response: any[]) => {
        this.events = response;
        this.showAllEvents = this.events.filter(event => event.public && this.userId != event.eventplanner
          && !event.invited.includes(this.userId) && !event.participants.includes(this.userId));
        this.showAllEvents.sort((a, b) => (a.date > b.date) ? 1 : -1);
        this.showEvents = this.showAllEvents;
      });

    this.filteredEventList = this.input.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(value => value.length >= 1 ? this._filter(value) : [])
      );
  }

  // Searchbar
  displayFn(event?: any): string | undefined {
    return event ? event.name : undefined;
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.showAllEvents.filter(singleTag => singleTag.name.toLowerCase().indexOf(filterValue) === 0);
  }

  changeEventPerName(event: any) {
    this.showEvents = this.showAllEvents.filter(singleEvent => singleEvent.name == event.name);
  }

  changeEventPerTag(tag: any) {
    this.showEvents = this.showAllEvents.filter(event => event.tags.includes(tag.id));
  }

  eventDetail(id: any) {
    this.router.navigate(['/event-detail/' + id]);
  }

  participateEvent(event: any) {
    event.participants.push(this.userId);
    this.eventService.updateEvent(event).subscribe(() => {
      this.router.navigate(['/event-detail/' + event.id]);
    });
  }

}

