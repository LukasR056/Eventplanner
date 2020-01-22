import {Component, OnInit} from '@angular/core';
import {TaskService} from '../service/task.service';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../service/user.service';
import {EventService} from '../service/event.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskFormGroup;
  userOptions: any[];
  deadlineTime: any;
  private userId: any;
  currentEvent: any;
  event: any;


  constructor(private fb: FormBuilder, private userService: UserService, private eventService: EventService, private http: HttpClient, private route: ActivatedRoute, private taskService: TaskService) {
  }

  ngOnInit() {

    this.currentEvent = this.taskService.currentEventid;
    this.userId = localStorage.getItem('user_id');

    //event wird hier hergeholt was bei diesem Task verwendet wird
    this.eventService.getEventWithId(Number(this.currentEvent)).subscribe(response => {
      this.event = response;
      console.log(this.event);
    });

    this.userService.retrieveUserOptions().subscribe((result) => {
      this.userOptions = result;
    });


    this.deadlineTime = '00:00';
    this.taskFormGroup = this.fb.group({
      id: [null],
      title: ['', [Validators.required]],
      description: [null],
      verifiedByPlanner: [null],
      verifiedByParticipant: [null],
      status: [null],
      deadlineDate: ['', [Validators.required]],
      deadlineTime: ['', [Validators.required]],
      responsible: [null],
      event: [null],
    });
  }

  createTask() {
    const task = this.taskFormGroup.value;
    console.log(task);
  }
}
