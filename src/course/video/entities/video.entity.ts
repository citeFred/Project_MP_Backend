import { IsOptional } from 'class-validator';
import { CommonEntity } from 'src/common/common.entity';
import { VideoTopic } from 'src/course/video_topic/entities/video_topic.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Video extends CommonEntity {
    @Column({ type: 'varchar', length: 255 })
    video_url: string;

    @Column()
    video_title: string;
    
    @ManyToOne(() => VideoTopic, (videotopic) => videotopic.videos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'video_topic_id' })
    videoTopic: VideoTopic;

    @Column({ nullable: true, type: 'text', name: 'summary' })
    @IsOptional()
    summary?: string;
}