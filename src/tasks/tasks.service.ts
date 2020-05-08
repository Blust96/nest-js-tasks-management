import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getFilteredTasks(filterDto: GetTasksFilterDto): Task[] {
        
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();

        if (status) tasks = tasks.filter(task => task.status === status);
        if (search) tasks = tasks.filter(task => {
            return task.title.includes(search) || task.description.includes(search);
        });

        return tasks;

    }

    getTaskById(id: string): Task {
        const foundTask = this.tasks.find(task => task.id === id);
        if(!foundTask) { throw new NotFoundException(`Task with id ${id} not found.`); }
        return foundTask;
    }

    createTask(createTaskDto: CreateTaskDto): Task {

        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task;

    }

    deleteTask(id: string): void {
        //TODO: avoiding loop repetition on tasks (find and filter)
        const foundTask = this.getTaskById(id);
        this.tasks = this.tasks.filter((task) => task.id !== foundTask.id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        let foundTask = this.getTaskById(id);
        foundTask.status = status;
        return foundTask;
    }

}
