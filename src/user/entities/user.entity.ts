
import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ProjectRegistration } from 'src/project/project_registration/entities/registration.entity';
import { Project } from 'src/project/projects/entities/project.entity';
import { UserRole } from 'src/enums/user-role.enum';
import { Course } from 'src/course/courses/entities/course.entity';
import { CourseRegistration } from 'src/course/course_registration/entities/course_registration.entity';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Exhibition } from 'src/exhibition/exhibitions/entities/exhibition.entity';
import { CommonEntity } from 'src/common/common.entity';

@Entity()
export class User extends CommonEntity {
    @Column({ type: 'varchar', length: 18 })
    user_name: string;

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    account_id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    @Column()
    email: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        nullable: false,
    })

    @Column()
    user_role: UserRole;

    @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
    nick_name: string;

    @ManyToMany(() => Course, course => course.user)
    @JoinTable()
    course: Course[];

    @OneToMany(() => Exhibition, exhibition => exhibition.user,{ cascade: true })
    exhibition: Exhibition[];

    @ManyToMany(() => Project, (project) => project.users)
    @JoinTable() 
    projects: Project[];

    @OneToMany(() => ProjectRegistration, (project_registration) => project_registration.user)
    project_registrations: ProjectRegistration[];

    @OneToMany(() => CourseRegistration, (course_registration) => course_registration.user)
    course_registrations: CourseRegistration[];

    @OneToMany(() => Attendance, attendance => attendance.user)
    attendances: Attendance[];
}