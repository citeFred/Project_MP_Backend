import { IsOptional, IsEnum, IsDate } from 'class-validator';
import { RegistrationStatus } from 'src/enums/registration-status.enum';

export class UpdateRequestCourseRegistrationDto {
    @IsOptional()
    @IsEnum(RegistrationStatus)
    course_registration_status?: RegistrationStatus;

    @IsOptional()
    @IsDate()
    course_reporting_date?: Date;
}