import { VideoResponseDto } from "src/course/video/dto/video-response.dto";
import { VideoTopic } from "../entities/video_topic.entity";

export class VideoTopicWithVideoTitle {
    video_topic_id: number;
    video_topic_title: string;
    videos: VideoResponseDto[];

    constructor(video_topic: VideoTopic) {
        this.video_topic_id = video_topic.id;
        this.video_topic_title = video_topic.video_topic_title;
        // videos 배열이 있을 경우 video_id와 video_title만 매핑
        this.videos = video_topic.videos 
            ? video_topic.videos.map(videos => new VideoResponseDto(videos)) 
            : [];
    }
}