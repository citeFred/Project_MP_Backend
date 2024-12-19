import { IsNotEmpty, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { RegistrationStatus } from 'src/enums/registration-status.enum';

export class CreateRequestCourseRegistrationDto {
    @IsNotEmpty()
    @IsEnum(RegistrationStatus)
    @Transform(({ value }) => value || RegistrationStatus.PENDING)
    course_registration_status: RegistrationStatus;

    @IsNotEmpty()
    course_reporting_date: string;
}