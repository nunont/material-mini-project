import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/interfaces/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})

export class TasksComponent {
  showMessage = false;
  submitted = false;

  todo: Task[] = [
    {
      title: 'Buy milk',
      description: 'Go to the store and buy milk',
    },
    {
      title: 'Drawing on canvas',
      description: 'buy 3 canvas and pens!',
    },
  ];

  inProgress: Task[] = [];

  done: Task[] = [];

  addTaskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  get title() {
    return this.addTaskForm.get('title')!;
  }

  get description() {
    return this.addTaskForm.get('description')!;
  }

  addTask() {
    this.submitted = true;
    if (this.addTaskForm.invalid) {
      return;
    }
    this.todo.push(this.addTaskForm.value as Task);
    this.addTaskForm.reset();
    this.showMessage = true;

    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }

  onSubmit(): void {
    this.submitted = false;
    if (this.addTaskForm.invalid) {
      return;
    }
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.container.data || !event.previousContainer.data) {
      return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  deleteIt(list: string, task: Task) {
    if (list == 'todo') {
      var index = this.todo.indexOf(task);
      this.todo.splice(index, 1);
    } else if (list == 'inProgress') {
      var index = this.inProgress.indexOf(task);
      this.inProgress.splice(index, 1);
    } else if (list == 'done') {
      var index = this.inProgress.indexOf(task);
      this.done.splice(index, 1);
    }
  }
}
