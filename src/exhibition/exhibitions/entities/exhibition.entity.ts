import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ExhibitionDoc } from '../../exhibitions_doc/entities/exhibition_doc.entity';
import { ExhibitionMember } from '../../exhibitions_member/entities/exhibition_member.entity';
import { ExhibitionIntro } from '../../exhibition_intro/entities/exhibition_intro.entity';
import { User } from 'src/user/entities/user.entity';
import { CommonEntity } from 'src/common/common.entity';

@Entity()
export class Exhibition extends CommonEntity {
    @Column()
    generation: string;

    @Column({ unique: true })
    exhibition_title: string;

    @Column()
    description: string;
    
    @Column({ type: 'timestamp' })
    exhibition_date: Date;
    
    @Column()
    file_path: string;
    
    @Column()
    team_name: string; 

    @OneToMany(() => ExhibitionDoc, doc => doc.exhibition, { cascade: true }) 
    exhibitionDocs: ExhibitionDoc[];

    @OneToMany(() => ExhibitionMember, member => member.exhibition, { cascade: true })
    exhibitionMembers: ExhibitionMember[];

    @OneToMany(() => ExhibitionIntro, exhibitionIntro => exhibitionIntro.exhibition , {cascade:true})
    exhibitionIntros: ExhibitionIntro[];

    @ManyToOne(() => User, user => user.exhibition, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'userId' })
    user: User[];
}