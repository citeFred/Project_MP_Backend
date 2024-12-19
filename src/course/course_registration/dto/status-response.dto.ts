import { RegistrationStatus } from 'src/enums/registration-status.enum';
import { CourseRegistration } from '../entities/course_registration.entity';

export class StatusResponseDto {
    course_registration_status: RegistrationStatus;
    course_reporting_date: Date;

    constructor(registration: CourseRegistration) {
        this.course_registration_status = registration.course_registration_status; // 강의 신청 상태
        this.course_reporting_date = registration.course_reporting_date; // 강의 신청 날짜
    }
}