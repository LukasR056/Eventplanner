import { Component, OnInit } from '@angular/core';
import {TaskService} from '../service/task.service';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskFormGroup;
  userOptions: any;
  deadlineTime: any;


  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit() {
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

  }
}
