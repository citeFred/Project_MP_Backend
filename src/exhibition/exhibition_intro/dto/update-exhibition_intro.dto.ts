import { PartialType } from '@nestjs/mapped-types';
import { CreateExhibitionIntroDto } from './create-exhibition_intro.dto';
import { IsOptional, IsArray, IsString, ArrayMinSize, ArrayMaxSize, IsNotEmpty } from 'class-validator';

export class UpdateExhibitionIntroDto extends PartialType(CreateExhibitionIntroDto) {
    @IsOptional()
    @IsNotEmpty()
    id: number;
    
    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(3)
    @IsString({ each: true })
    introduce?: string[];
}