import { IsString, Length } from 'class-validator'

export class CreateVideoTopicDto {
    @IsString()
    @Length(0, 20)
    video_topic_title: string;
}