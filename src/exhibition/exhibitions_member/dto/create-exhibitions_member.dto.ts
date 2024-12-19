import { IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateExhibitionMemberDto } from './create-exhibition_member.dto';

export class CreateExhibitionsMembersDto {
    @IsNotEmpty()
    id: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateExhibitionMemberDto)
    members: CreateExhibitionMemberDto[];
}