import { IsNumber, IsString } from 'class-validator';

export class CheckAttendanceDto {
    @IsNumber()
    id: number;

    @IsString()
    inputCode: string;
}