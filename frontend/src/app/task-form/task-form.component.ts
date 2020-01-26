import {Component, OnInit} from '@angular/core';
import {TaskService} from '../service/task.service';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
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
  deadline_time: any;
  private userId: any;
  event: any;
  isLoggedUserEventplanner = true;
  loggedUser: any;
  oldTask: any;


  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private eventService: EventService, private http: HttpClient, private route: ActivatedRoute, private taskService: TaskService) {
  }

  ngOnInit() {
    this.userId = Number(localStorage.getItem('user_id'));


    this.userService.getUserById(this.userId).subscribe(response => {
      this.loggedUser = response;
    });

    if (this.taskService.currentEvent.eventplanner != this.userId) {
      this.isLoggedUserEventplanner = false;
    }

    this.userService.retrieveUserOptions().subscribe((result: any[]) => {
      this.userOptions = result.filter(user => (this.taskService.currentEvent.participants ? this.taskService.currentEvent.participants.includes(user.id) : false) || user.id == this.taskService.currentEvent.eventplanner);
    });


    this.deadline_time = '00:00';
    this.taskFormGroup = this.fb.group({
      id: [null],
      title: ['', [Validators.required]],
      description: [null],
      verified_by_planner: [null],
      verified_by_participant: [null],
      status: ['', [Validators.required]],
      deadline_date: ['', [Validators.required],],
      deadline_time: ['00:00', [Validators.required]],
      responsible: [this.userId, [Validators.required]],
      event: [null],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskService.getTask(id)
        .subscribe((response) => {
          this.taskFormGroup.patchValue(response);
          this.deadline_time = this.taskFormGroup.value.deadline_time;
          this.deadline_time.substring(0, 5);
          this.taskFormGroup.value.deadline_time.substring(0, 5);
          this.oldTask = this.taskFormGroup.value;
        });
    } else {
      this.deadline_time = '00:00';
    }

  }

  createTask() {
    const task = this.taskFormGroup.value;
    if (task.id) {
      console.log(task);
      // falls der responsible sich geändert hat so muss eine Bestätigng eingeholt werden
      if (task.responsible != this.oldTask.responsible && task.responsible != this.userId) {
        task.responsible = this.oldTask.responsible;
        console.log('res wurde geändert');
        task.verified_by_participant = false;
      }
      this.taskService.updateTask(task).subscribe((response: any) => {
        this.router.navigate(['/event-detail/' + this.taskService.currentEvent.id]);
      });


    } else {
      task.event = this.taskService.currentEvent.id;

      if (this.taskService.currentEvent.eventplanner == this.userId && task.responsible == this.userId) {
        task.verified_by_participant = true;
        task.verified_by_planner = true;
        task.responsible = this.userId;
      }
      if (this.taskService.currentEvent.eventplanner == this.userId && task.responsible != this.userId) {
        task.verified_by_participant = false;
        task.verified_by_planner = true;
      }
      if (this.taskService.currentEvent.eventplanner != this.userId) {
        task.verified_by_participant = true;
        task.verified_by_planner = false;
        task.responsible = this.userId;
      }

      this.taskService.createTask(task).subscribe((response: any) => {
        this.router.navigate(['/event-detail/' + this.taskService.currentEvent.id]);
      });

    }


    alert('Your task was created successfully. Now the event planner just needs to verify your task.')

  }
}
