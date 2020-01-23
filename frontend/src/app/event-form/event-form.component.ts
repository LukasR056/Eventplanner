import {Component, Inject, OnInit} from '@angular/core';
import {EventService} from '../service/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {NgxMaterialTimepickerComponent} from 'ngx-material-timepicker';
import {TagsService} from '../service/tags.service';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


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
  loggedUser: any;
  newTagForm;


  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
              private router: Router, private eventService: EventService, private userService: UserService, private tagService: TagsService, public dialog: MatDialog) {
  }


  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.userId = localStorage.getItem('user_id');

    this.userService.getUserById(this.userId).subscribe((result) => {
      this.loggedUser = result;
    });

    this.tagService.getTags().subscribe((result) => {
      this.tagOptions = result;
      this.tagOptions.sort((a, b) => (a.name > b.name) ? 1 : -1)  ;
    });

    this.newTagForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)] , [this.tagValidator()]]
    });

    this.eventFormGroup = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      description: [null],
      location: ['', [Validators.required], [this.tagValidator()]],
      public: [false],
      eventplanner: [null],
      tags: [[]],
      invited: [[]],
      participants: [[]],
      pictures: [[]],
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
      // Bei !== kommt nicht der gewünschte Output raus bei !=, deshalb das folgende Kommentar
      // tslint:disable-next-line:triple-equals
      this.userOptions = response.filter(user => user.id != this.userId
        && !this.eventFormGroup.value.participants.includes(user.id)
        && !this.eventFormGroup.value.invited.includes(user.id)
        && this.loggedUser.friends.includes(user.id));
      if (this.userOptions.length === 0) {
        this.userOptionsNotEmpty = false;

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
      event.tasks = [];
      this.eventService.createEvent(event)
        .subscribe((response: any) => {
          this.router.navigate(['/homepage']);

        });
      console.log(event);
    }
  }

  addNewTag() {
    const test = this.newTagForm.value;
    this.tagService.createTag(test).subscribe(() => {
        this.tagService.getTags().subscribe((result) => {
          this.tagOptions = result;
        });
      }
    );
  }

  tagValidator(): AsyncValidatorFn {
    console.log('im in');
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.tagService.getTags()
        .pipe(
          map((tags: any[]) => {
            // const currentId = this.newTagForm.controls.id.value; nach dem Return in Zeile 135: (currentId || t.id !== currentId) &&
            const currentName = this.newTagForm.controls.name.value;
            const tagWithSameTitle = tags.find((t) => {
              return t.name.toLowerCase() === currentName.toLowerCase();
            });

            if (tagWithSameTitle) {
              console.log('name same');
              return {
                nameAlreadyExists: true
              };
            } else {
              console.log('name not same');
              return null;
            }
          })
        );
    };
  }
}
