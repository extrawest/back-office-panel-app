import { TaskTypeEnum } from './../enums/task-type.enum';

export interface Task {
  taskName: string;
  taskStatus: TaskTypeEnum;
  taskId?: string;
}
