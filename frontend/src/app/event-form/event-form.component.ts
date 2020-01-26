import {Component, Inject, OnInit} from '@angular/core';
import {EventService} from '../service/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, Validators, ValidatorFn} from '@angular/forms';
import {UserService} from '../service/user.service';
import {NgxMaterialTimepickerComponent} from 'ngx-material-timepicker';
import {TagsService} from '../service/tags.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


export interface DialogData {
  animal: string;
  name: string;
}

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
  animal: string;
  name: string;
  public parentProp = true;
  public eventPicNumber = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
              private router: Router, private eventService: EventService, private userService: UserService,
              public dialog: MatDialog, private tagService: TagsService) {
  }


  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.userId = localStorage.getItem('user_id');

    this.userService.getUserById(this.userId).subscribe((result) => {
      this.loggedUser = result;
    });


    this.tagService.getTags().subscribe((result) => {
      this.tagOptions = result;
      this.tagOptions.sort((a, b) => (a.name > b.name) ? 1 : -1);
    });


    this.eventFormGroup = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['00:00', [Validators.required]],
      description: ['', [Validators.required]],
      location: ['', [Validators.required]],
      public: [false],
      eventplanner: [null],
      tags: [[]],
      tasks: [[]],
      invited: [[]],
      participants: [[]],
      pictures: [[]],
    });


    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEventWithId(id)
        .subscribe((response) => {
          this.eventFormGroup.patchValue(response);
          this.time = this.eventFormGroup.value.time;
          this.time = this.time.substring(0, 5);
          if (this.eventFormGroup.value.pictures.length >= 10) {
            this.eventPicNumber = true;
          }
          console.log('Laenge' + this.eventFormGroup.value.pictures.length);
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '40%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }


  createEvent() {
    const event = this.eventFormGroup.value;
    console.log(Date.parse(event.date))
    console.log(Date.now());
    //Date.parse(event.date) > Date.now()? 'event ist größesr' : 'event ist nicht größesr'

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
    }
  }



}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder, private tagService: TagsService) {
  }

  newTagForm;
  tagOptions;

  ngOnInit() {
    this.newTagForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)], [this.tagValidator()]]
    });

    this.tagOptions = [];

    this.tagService.getTags().subscribe((result) => {
      this.tagOptions = result;
      this.tagOptions.sort((a, b) => (a.name > b.name) ? 1 : -1);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  tagValidator(): AsyncValidatorFn {
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
              return {
                nameAlreadyExists: true
              };
            } else {
              return null;
            }
          })
        );
    };
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

}
