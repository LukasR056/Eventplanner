import {Component, OnInit} from '@angular/core';
import {EventService} from '../service/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../service/user.service';
import {NgxMaterialTimepickerComponent} from 'ngx-material-timepicker';
import {TagsService} from '../service/tags.service';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  eventFormGroup;
  userOptions;
  time: any;
  userId: any;
  username: string;
  tagOptions;
  userOptionsNotEmpty = true;


  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
              private router: Router, private eventService: EventService, private userService: UserService, private tagService: TagsService) {
  }


  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.userId = localStorage.getItem('user_id');

    this.tagService.getTags().subscribe((result) => {
      this.tagOptions = result;
    });


    this.eventFormGroup = this.fb.group({
      id: [null],
      name: [null],
      date: [null],
      time: [null],
      description: [null],
      location: [null],
      public: [null],
      eventplanner: [null],
      tags: [[]],
      invited: [[]],
      participants: [[]],
      pictures: [null],
    });


    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get('/api/event/' + id + '/get')
        .subscribe((response) => {
          this.eventFormGroup.patchValue(response);
          //console.log(this.userOptions);
          this.time = this.eventFormGroup.value.time;
          this.time = this.time.substring(0, 5);

        });
    } else {
      this.time = '00:00';
    }

    this.userService.getUsers().subscribe((response: any[]) => {
      // tslint:disable-next-line:triple-equals
      this.userOptions = response.filter(user => user.id != this.userId && !this.eventFormGroup.value.participants.includes(user.id) && !this.eventFormGroup.value.invited.includes(user.id));
      if (this.userOptions.length === 0) {
        this.userOptionsNotEmpty = false;
        //console.log(this.userOptionsEmpty);
      }
    });


  }

  createEvent() {
    const event = this.eventFormGroup.value;
    if (event.id) {
      this.eventService.updateEvent(event)
        .subscribe(() => {
          this.router.navigate(['/event-detail/' + event.id]);
        });
    } else {
      event.eventplanner = this.userId;
      this.eventService.createEvent(event)
        .subscribe((response: any) => {
          this.router.navigate(['/event-detail/' + event.id]);
          console.log(event);
        });
      console.log(event);
    }
  }


}
