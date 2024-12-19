import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import { RegistrationStatus } from 'src/enums/registration-status.enum';
import { TeamRole } from 'src/enums/team-role.enum';
import { CommonEntity } from 'src/common/common.entity';

@Entity()
export class ProjectRegistration extends CommonEntity {
    @Column({ type: 'timestamp', nullable: false })
    reporting_date: Date;

    @Column({
        type: 'enum',
        enum: RegistrationStatus,
        default: RegistrationStatus.PENDING,
    })
    registration_status: RegistrationStatus;

    @Column({ type: 'varchar', length: 50, nullable: true })
    project_role: string;

    @Column({
        type: 'enum',
        enum: TeamRole,
        default: TeamRole.MEMBER,
    })
    team_role: TeamRole;

    // project_registration - user
    @ManyToOne(() => User, (user) => user.project_registrations)
    @JoinColumn()
    user: User;

    // project_registration - project
    @ManyToOne(() => Project, (project) => project.project_registrations)
    @JoinColumn() 
    project: Project;
}