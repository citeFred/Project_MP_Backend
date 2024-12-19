import { Entity, Column, ManyToMany, OneToMany } from 'typeorm';
import { ProjectDoc } from '../../project_doc/entities/project_doc.entity';
import { ProjectRegistration } from 'src/project/project_registration/entities/registration.entity';
import { User } from 'src/user/entities/user.entity';
import { CommonEntity } from 'src/common/common.entity';

@Entity()
export class Project extends CommonEntity {
    @Column({ type: 'varchar', nullable: false, length: 100, unique: true })
    topic: string;

    @Column({ type: 'varchar', nullable: false, length: 50, unique: true })
    class: string;

    @Column({
        type: 'enum',
        enum: ['in_progress', 'completed'],
        default: 'in_progress',
    })
    project_status: 'in_progress' | 'completed';

    @Column({ type: 'varchar', length: 50, nullable: true })
    team_name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    profile: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    requirements: string;

    @Column({ type: 'varchar', length: 10, nullable: false })
    generation: string;

    @ManyToMany(() => User, (user) => user.projects)
    users: User[];

    @OneToMany(() => ProjectRegistration, (project_registration) => project_registration.project)
    project_registrations: ProjectRegistration;

    @OneToMany(() => ProjectDoc, (project_doc) => project_doc.project)
    project_docs: ProjectDoc[];
}