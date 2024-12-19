import { IsNotEmpty, IsString, IsArray, ArrayMinSize, ArrayMaxSize } from 'class-validator';

export class CreateExhibitionIntroDto {
    @IsNotEmpty()
    id: number;

    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(3)
    @IsString({ each: true })
    introduce: string[];
}