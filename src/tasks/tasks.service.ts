import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilters(filterDto: GetTasksFilterDto) {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepo.findOne({ where: { id: id } });
    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return found;
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepo.createTask(createTaskDto);
  }

  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Task with ${id} not found`);
  //   }
  //   return found;
  // }
  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }
  // updateTaskStatus(id: string, status: TaskStatus): Task | null {
  //   const taskToUpdate = this.getTaskById(id);
  //   if (taskToUpdate) {
  //     taskToUpdate.status = status;
  //     return taskToUpdate;
  //   } else return null;
  // }
}
