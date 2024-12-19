import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Exhibition } from '../../exhibitions/entities/exhibition.entity';
import { CommonEntity } from 'src/common/common.entity';

@Entity()
export class ExhibitionMember extends CommonEntity {
    @Column()
    name: string;

    @Column({ nullable: true })
    nick_name?: string;
    
    @Column()
    file_path: string;

    @ManyToOne(() => Exhibition, exhibition => exhibition.exhibitionMembers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'exhibition_id', referencedColumnName: 'exhibition_id'})
    exhibition: Exhibition;
}