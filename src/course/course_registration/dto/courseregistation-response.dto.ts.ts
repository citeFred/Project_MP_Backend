import { CourseRegistration } from '../entities/course_registration.entity';
import { UserResponseDto } from '../../../user/dto/user-response.dto';
import { CourseResponseDto } from '../../courses/dto/course-response.dto';
import { RegistrationStatus } from 'src/enums/registration-status.enum';

export class CourseRegistationResponseDto {
    course_registration_status: RegistrationStatus;
    course_reporting_date: Date;
    applicant: UserResponseDto;
    currentCourse: CourseResponseDto;

    constructor(registration: CourseRegistration) {
        this.course_registration_status = registration.course_registration_status;
        this.course_reporting_date = registration.course_reporting_date;
        this.applicant = new UserResponseDto(registration.user);
        this.currentCourse = new CourseResponseDto(registration.course);
    }
}