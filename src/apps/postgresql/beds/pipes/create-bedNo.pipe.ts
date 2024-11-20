import {
  ArgumentMetadata,
  Injectable,
  NotAcceptableException,
  PipeTransform,
} from '@nestjs/common';
import { AjvService } from 'src/services/global/ajv/ajv.service';
import { ajvCreateBedNoSchema } from '../schema/create-bedNo.schema';

@Injectable()
export class CreateBedNoPipe implements PipeTransform {
  constructor(private ajvService: AjvService) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const validator = this.ajvService.buildValidator(ajvCreateBedNoSchema);

    if (validator(value)) {
      return value;
    } else {
      throw new NotAcceptableException(validator.errors);
    }
  }
}
