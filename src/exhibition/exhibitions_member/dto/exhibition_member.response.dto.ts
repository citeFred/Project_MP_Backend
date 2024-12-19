import { IsNotEmpty } from "class-validator";

export class ExhibitionMemberResponseDto {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    file_path: string;
}