import { IsNotEmpty, IsEnum, IsDateString } from 'class-validator';
import { RegistrationStatus } from 'src/enums/registration-status.enum';

export class CreateProjectRegistrationDto {

    @IsNotEmpty()
    @IsDateString()
    reporting_date: string;

    @IsNotEmpty()
    @IsEnum(RegistrationStatus)
    registration_status: RegistrationStatus;
}
