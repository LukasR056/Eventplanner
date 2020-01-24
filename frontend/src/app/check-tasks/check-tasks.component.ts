import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EventService} from '../service/event.service';
import {Task} from 'protractor/built/taskScheduler';
import {TaskService} from '../service/task.service';
import {log} from 'util';

@Component({
  selector: 'app-check-tasks',
  templateUrl: './check-tasks.component.html',
  styleUrls: ['./check-tasks.component.scss']
})
export class CheckTasksComponent implements OnInit {

  panelOpenState = false;
  private userId: number;
  tasks: any[];

  constructor(private router: Router, private taskService: TaskService, private changeDetection: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.userId = Number(localStorage.getItem('user_id'));

    this.taskService.getTasks().subscribe((response: any[]) => {

      //erste condition, wo er beim  Task verantworlich ist und verifiedParticipant false ist| die Tasks wo er als eventplanner dabei ist und dort verifiedPlanner false ist | zum schluss noch alle task wo beide verified nicht true
      this.tasks = response.filter(task => ((task.responsible.id == this.userId && !task.verified_by_participant)
        || (task.event.eventplanner == this.userId && !task.verified_by_planner))
        && !(task.verified_by_participant && task.verified_by_planner));

      console.log(this.tasks.toString());
      console.log(this.tasks.length.toString());
    });

  }

  logtaskfunc(task: any) {
    console.log(task);
    this.panelOpenState = true;
  }

  accepTask(updatedTask: any) {

    updatedTask.verified_by_planner = true;
    updatedTask.verified_by_participant = true;
    const eventId = updatedTask.event.id;
    delete updatedTask.event;
    updatedTask.event = eventId;

    const indexOfUpdatedTask = this.tasks.indexOf(updatedTask);
    this.tasks.splice(indexOfUpdatedTask, 1);

    this.taskService.updateTask(updatedTask).subscribe(() => {
    });
  }

  denyTask(canceledTask: any) {


    const eventId = canceledTask.event.id;
    delete canceledTask.event;
    canceledTask.event = eventId;

    const indexOfcanceledTask = this.tasks.indexOf(canceledTask);
    this.tasks.splice(indexOfcanceledTask, 1);

    this.taskService.deleteTask(canceledTask).subscribe();

  }
}
