import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmExModule } from './database/typeorm-ex.module';
import { Task } from './tasks/task.entity';
import { TasksService } from './tasks/tasks.service';
import { TasksController } from './tasks/tasks.controller';
import { TaskRepository } from './tasks/task.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      entities: [Task],
    }),
    TypeOrmExModule.forCustomRepository([TaskRepository]),
    TasksModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class AppModule {}
