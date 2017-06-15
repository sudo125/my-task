import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../Task';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];    
  title: string;
  isDone: boolean;
  
  constructor(private taskService:TaskService) { 
        this.taskService.getTasks()
            .subscribe(tasks =>{
               this.tasks = tasks;
               console.log("getting the tasks from the database")
            });
  }
  
  addTask(event){
    event.preventDefault();
    console.log(this.title);
    var newtask = {
    title : this.title,
    isDone: false
    }
    
    this.taskService.addTask(newtask)
        .subscribe(task => {
            this.tasks.push(task);
            this.title = '';
        });
  }
  
  deleteTask(id){
    var tasks = this.tasks; 
    this.taskService.deleteTask(id).subscribe(data => {
        if(data.n == 1){
            for(var i = 0; i < tasks.length;i++){

                if(tasks[i]._id == id){
                        tasks.splice(i, 1);

                }
            }
        }
    });
  }
  
  
  ngOnInit() {
  }

}
