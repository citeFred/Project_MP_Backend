// CreateRequestCourseRegistrationDto.ts
import { IsNotEmpty, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { RegistrationStatus } from 'src/enums/registration-status.enum';

export class CreateRequestCourseRegistrationDto {

    @IsNotEmpty()
    @IsEnum(RegistrationStatus)
    @Transform(({ value }) => value || RegistrationStatus.PENDING) // 기본값을 PENDING으로 설정
    course_registration_status: RegistrationStatus;

    @IsNotEmpty() // 필수 필드로 설정   
    course_reporting_date: string; // ISO 형식의 날짜 문자열
}