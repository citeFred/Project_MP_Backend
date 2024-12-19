import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RegistrationStatus } from 'src/enums/registration-status.enum';
import { TeamRole } from 'src/enums/team-role.enum';

export class UpdateProjectRegistrationDto {

    @IsOptional()
    @IsEnum(RegistrationStatus)
    registration_status?: RegistrationStatus;

    @IsOptional()
    @IsString()
    project_role?: string;
    
    @IsOptional()
    @IsEnum(TeamRole)
    team_role?: TeamRole;
}
