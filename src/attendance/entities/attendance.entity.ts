import { CommonEntity } from 'src/common/common.entity';
import { Course } from 'src/course/courses/entities/course.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class Attendance extends CommonEntity{
    @Column()
    attendance_date: Date;

    @Column({
        type: 'enum',
        enum: ['present', 'absent', 'late'],
        default: 'absent',
    })
    field: 'present' | 'absent' | 'late';

    @Column()
    random_code: string;

    @ManyToOne(() => Course, course => course.attendances)
    course: Course;

    @ManyToOne(() => User, user => user.attendances)
    user: User;
}
