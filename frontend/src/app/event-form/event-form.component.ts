import {Component, OnInit} from '@angular/core';
import {EventService} from '../service/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../service/user.service';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  eventFormGroup;
  userOptions;
  time: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
              private router: Router, private eventService: EventService, private userService: UserService) {
  }

  ngOnInit() {
    this.eventFormGroup = this.fb.group({
      id: [null],
      name: [null],
      date: [null],
      time: [null],
      description: [null],
      location: [null],
      public: [null],
      eventplanner: [null],
      invited: [null],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get('/api/event/' + id + '/get')
        .subscribe((response) => {
          this.eventFormGroup.patchValue(response);
          this.time = this.eventFormGroup.time;
        });
    }

    this.userService.retrieveUserOptions().subscribe((result) => {
      this.userOptions = result;
    });
  }

  createEvent() {
    const event = this.eventFormGroup.value;
    if (event.id) {
      this.eventService.updateEvent(event)
        .subscribe(() => {
          alert('updated successfully');
        });
    } else {
      this.eventService.createEvent(event)
        .subscribe((response: any) => {
          this.router.navigate(['/event-list']);
        });
    }
  }


  test(time: any) {

  }
}
