import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateExhibitionMemberDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    image?: Express.Multer.File;
}