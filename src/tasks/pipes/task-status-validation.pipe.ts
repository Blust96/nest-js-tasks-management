import { PipeTransform, BadRequestException} from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {

    readonly allowedStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ];

    transform(value: any) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) { throw new BadRequestException(`"${value}" is an invalid status`); }
        return value;
    }

    isStatusValid(status: any): boolean {
        return this.allowedStatus.indexOf(status) !== -1;
    }

}