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
  private username: any;
  private userId: any;


  constructor(private tagService: TagsService, private  eventService: EventService, private router: Router) {
  }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.userId = localStorage.getItem('user_id');
    this.tagService.getTags()
      .subscribe((response: any[]) => {
        this.tags = response;
      });
    this.eventService.getEventsId()
      .subscribe((response: any[]) => {
        this.events = response;
      });
  }

  // event.tags.includes(tag.id) && event.public
  changeEvent(tag: any) {
    // console.log(this.userId)
    this.showEvents = this.events.filter(event => event.tags.includes(tag.id) && event.public && !event.participants.includes(Number(this.userId)) && !event.invited.includes(Number(this.userId)));
    // console.log(this.showEvents);
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

