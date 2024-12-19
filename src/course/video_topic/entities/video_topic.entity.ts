import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Video } from 'src/course/video/entities/video.entity';
import { CommonEntity } from 'src/common/common.entity';

@Entity()
export class VideoTopic extends CommonEntity {
    @Column({ type: 'varchar', length: 20 })
    video_topic_title: string;
    
    @ManyToOne(() => Course, course => course.videoTopic, { onDelete: 'CASCADE' })
    @JoinColumn()
    course: Course;

    @OneToMany(() => Video, video => video.videoTopic, { cascade: true })
    videos: Video[];
}