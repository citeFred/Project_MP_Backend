import { VideoTopic } from "../entities/video_topic.entity";

export class VideoTopicResponseDto {
    id: number;
    video_topic_title: string;

    constructor(video: VideoTopic) {
        this.id = video.id;
        this.video_topic_title = video.video_topic_title;
    }
}