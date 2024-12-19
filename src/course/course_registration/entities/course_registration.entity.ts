import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { RegistrationStatus } from 'src/enums/registration-status.enum';
import { Course } from "src/course/courses/entities/course.entity";
import { User } from 'src/user/entities/user.entity';
import { CommonEntity } from "src/common/common.entity";

@Entity()
export class CourseRegistration extends CommonEntity {
    @Column({
        type: 'enum',
        enum: RegistrationStatus,
        default: RegistrationStatus.PENDING,
    })
    course_registration_status: RegistrationStatus;

    @Column({ type: 'timestamp', nullable: false })
    course_reporting_date: Date;

    @ManyToOne(() => User, (user) => user.course_registrations, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Course, (course) => course.course_registrations, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'courseId' })
    course: Course; 
}