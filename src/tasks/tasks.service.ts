import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user);
    }

    async getTaskById(id: number, user: User): Promise<Task> {
        const foundTask = await this.taskRepository.findOne({ where: { id, userId: user.id } });
        if(!foundTask) { throw new NotFoundException(`Task with id ${id} not found.`); }
        return foundTask;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async deleteTask(id: number, user: User): Promise<void> {
        const result = await this.taskRepository.delete({ id, userId: user.id });
        if(result.affected === 0) { throw new NotFoundException(`Task with id ${id} not found.`); }
    }

    async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
        let foundTask = await this.getTaskById(id, user);
        foundTask.status = status;
        await foundTask.save();
        return foundTask;
    }

}
