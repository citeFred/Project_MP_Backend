import { CommonEntity } from 'src/common/common.entity';
import { Feedback } from '../../feedback/entities/feedback.entity';
import { Project } from '../../projects/entities/project.entity';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class ProjectDoc extends CommonEntity {
    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'varchar', length: 255 })
    file_path: string;

    @ManyToOne(() => Project, (project) => project.project_docs)
    @JoinColumn()
    project: Project;

    @OneToMany(() => Feedback, (feedback) => feedback.projectDoc)
    feedbacks: Feedback[];
}