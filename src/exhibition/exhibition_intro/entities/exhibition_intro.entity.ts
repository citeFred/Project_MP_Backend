import { Entity, Column, ManyToOne,JoinColumn} from 'typeorm';
import { Exhibition } from '../../exhibitions/entities/exhibition.entity';
import { CommonEntity } from 'src/common/common.entity';

@Entity()
export class ExhibitionIntro extends CommonEntity {
    @Column({ type: 'text' })
    introduce: string;

    @ManyToOne(() => Exhibition, exhibition => exhibition.exhibitionIntros, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'exhibition_id', referencedColumnName: 'exhibition_id'})
    exhibition: Exhibition;
}