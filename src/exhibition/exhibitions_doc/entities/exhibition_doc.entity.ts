import { Entity, Column, ManyToOne ,JoinColumn} from 'typeorm';
import { Exhibition } from '../../exhibitions/entities/exhibition.entity';
import { CommonEntity } from 'src/common/common.entity';

@Entity()
export class ExhibitionDoc extends CommonEntity {
    @Column()
    file_path: string;

    @ManyToOne(() => Exhibition, exhibition => exhibition.exhibitionDocs, { onDelete: 'CASCADE' })
    @JoinColumn()
    exhibition: Exhibition;
}