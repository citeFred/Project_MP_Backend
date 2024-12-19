import { Entity, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DocName } from '../../doc_name/entities/doc_name.entity';
import { CommonEntity } from 'src/common/common.entity';

@Entity()
export class CourseDoc extends CommonEntity {
    @CreateDateColumn({ nullable: true })
    upload_date: Date; 
    
    @Column({ type: 'varchar', length: 100 })
    file_path: string;

    @Column({ type: 'varchar', length: 100 })
    file_name: string;

    @ManyToOne(() => DocName, (docname) => docname.courseDocs, { onDelete: 'CASCADE' })
    @JoinColumn()
    docName: DocName;
}