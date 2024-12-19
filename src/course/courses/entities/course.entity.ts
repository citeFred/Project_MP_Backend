import { Entity, Column, OneToMany, ManyToMany } from 'typeorm';
import { DocName } from '../../doc_name/entities/doc_name.entity';
import { VideoTopic } from 'src/course/video_topic/entities/video_topic.entity';
import { CourseRegistration } from 'src/course/course_registration/entities/course_registration.entity';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { User } from 'src/user/entities/user.entity';
import { CommonEntity } from 'src/common/common.entity';

@Entity()
export class Course extends CommonEntity {
    @Column({ type: 'varchar', length: 40 })
    course_title: string;

    @Column({ type: 'varchar', length: 100 })
    description: string;
    
    @Column({ type: 'varchar', length: 40 })
    instructor_name: string;

    @Column({ type: 'varchar', length: 100, nullable:true })
    course_notice: string;

    @Column({ type: 'varchar', length: 10, nullable: false, default: '3기'})
    generation: string;

    @ManyToMany(() => User, (user) => user.course)
    user: User[];

    @OneToMany(() => DocName, (docname) => docname.course, { cascade: true })
    docName: DocName[];

    @OneToMany(() => VideoTopic, (videoTopic) => videoTopic.course, { cascade: true })
    videoTopic: VideoTopic[];

    @OneToMany(() => CourseRegistration, (course_registration) => course_registration.course, { cascade: true })
    course_registrations: CourseRegistration[];

    @OneToMany(() => Attendance, attendance => attendance.course)
    attendances: Attendance[];
}