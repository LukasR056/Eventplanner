import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TagsService} from '../service/tags.service';
import {EventService} from '../service/event.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
  tags: any[];
  selectable = true;
  events: any [];
  showEvents: any[];


  constructor(private tagService: TagsService, private  eventService: EventService, private router: Router) {
  }

  ngOnInit() {
    this.tagService.getTags()
      .subscribe((response: any[]) => {
        this.tags = response;
      });
    this.eventService.getEvents()
      .subscribe((response: any[]) => {
        this.events = response;
      });
  }

  changeEvent(tag: any) {
    this.showEvents = this.events.filter(event => event.tags.includes(tag.id) && event.public );
    console.log(this.showEvents);
  }

  eventDetail(id: any) {
    this.router.navigate(['/event-detail/' + id]);
  }
}

