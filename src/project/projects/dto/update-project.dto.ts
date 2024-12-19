import { IsString, IsOptional, IsEnum } from 'class-validator';
import { RegistrationStatus } from 'src/enums/registration-status.enum';

export class UpdateProjectDto {
    @IsOptional()
    @IsString()
    topic?: string;

    @IsOptional()
    @IsString()
    class?: string;

    @IsOptional()
    @IsEnum(RegistrationStatus)
    status?: RegistrationStatus;

    @IsOptional()
    @IsString()
    team_name?: string;

    @IsOptional()
    @IsString()
    profile?: string;

    @IsOptional()
    @IsString()
    requirements?: string;

    @IsOptional()
    @IsString()
    generation?: string;
}