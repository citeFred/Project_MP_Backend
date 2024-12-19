import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateExhibitionsDocDto {
    @IsNotEmpty()
    exhibitions_id: number;

    @IsOptional()
    outputImages?: Express.Multer.File[];

    @IsOptional()
    outputVideo?: Express.Multer.File[];
}