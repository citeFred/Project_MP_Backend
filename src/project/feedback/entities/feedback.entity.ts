import { Entity, Column, ManyToOne } from 'typeorm';
import { ProjectDoc } from '../../../project/project_doc/entities/project_doc.entity';
import { CommonEntity } from 'src/common/common.entity';

@Entity()
export class Feedback extends CommonEntity {
    @Column()
    feedback_content: string;

    @ManyToOne(() => ProjectDoc, (project_doc) => project_doc.feedbacks)
    projectDoc: ProjectDoc;
}