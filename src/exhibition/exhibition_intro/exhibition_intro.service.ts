import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExhibitionIntro } from './entities/exhibition_intro.entity';
import { CreateExhibitionIntroDto } from './dto/create-exhibition_intro.dto';
import { UpdateExhibitionIntroDto } from './dto/update-exhibition_intro.dto';
import { Exhibition } from '../exhibitions/entities/exhibition.entity';

@Injectable()
export class ExhibitionIntroService {
    constructor(
        @InjectRepository(ExhibitionIntro)
        private readonly exhibitionIntroRepository: Repository<ExhibitionIntro>,
        @InjectRepository(Exhibition)
        private readonly exhibitionRepository: Repository<Exhibition>,
    ) {}

    async create(createExhibitionIntroDto: CreateExhibitionIntroDto): Promise<ExhibitionIntro[]> {
        const exhibitionId = Number(createExhibitionIntroDto.id);
        const exhibition = await this.exhibitionRepository.findOne({ where: { id: exhibitionId } });
    
        if (!exhibition) {
            throw new NotFoundException(`ID가 ${exhibitionId}인 전시를 찾을 수 없습니다.`);
        }
    
        // 현재 전시 소개 개수 확인
        const currentCount = await this.exhibitionIntroRepository.count({
            where: { exhibition: { id: exhibitionId } },
        });
    
        // 이미 3개가 존재하는 경우
        if (currentCount >= 3) {
            throw new ConflictException(`ID가 ${exhibitionId}인 전시는 이미 3개의 intro를 가지고 있습니다.`);
        }
    
        const exhibitionIntros: ExhibitionIntro[] = [];
        
        // 각 소개 텍스트를 반복하면서 저장
        for (const introText of createExhibitionIntroDto.introduce) {
            const exhibitionIntro = this.exhibitionIntroRepository.create({
                introduce: introText,
                exhibition,
            });
    
            exhibitionIntros.push(await this.exhibitionIntroRepository.save(exhibitionIntro));
        }
    
        return exhibitionIntros;
    }
    

    async findAll(): Promise<ExhibitionIntro[]> {
        return await this.exhibitionIntroRepository.find({ relations: ['exhibition'] });
    }

    async findOne(id: number): Promise<ExhibitionIntro> {
        const exhibitionIntro = await this.exhibitionIntroRepository.findOne({
        where: { id: id },
        relations: ['exhibition'],
    });
        if (!exhibitionIntro) {
        throw new NotFoundException(`ID가 ${ id }인 전시를 찾을 수 없습니다.`);
        }
        return exhibitionIntro;
    }

    async update(updateExhibitionIntroDto: UpdateExhibitionIntroDto): Promise<ExhibitionIntro[]> {
        const exhibitionId = updateExhibitionIntroDto.id;
        const existingIntros = await this.exhibitionIntroRepository.find({ where: { exhibition: { id: exhibitionId } } });
    
        // 전시 소개 개수 확인
        if (existingIntros.length >= 3) {
            console.warn(`ID가 ${exhibitionId}인 전시는 이미 3개의 소개를 가지고 있습니다. 추가는 불가능합니다.`);
        }
    
        // 기존 소개 업데이트
        const updatedIntros: ExhibitionIntro[] = [];
    
        // introduce가 제공된 경우
        if (updateExhibitionIntroDto.introduce) {
            for (let i = 0; i < updateExhibitionIntroDto.introduce.length; i++) {
                if (i < existingIntros.length) {
                    // 기존 소개 업데이트
                    existingIntros[i].introduce = updateExhibitionIntroDto.introduce[i];
                    updatedIntros.push(await this.exhibitionIntroRepository.save(existingIntros[i]));
                } else {
                    // 새로운 소개 추가는 막음
                    break;
                }
            }
        }
    
        return updatedIntros; // 업데이트된 전시 소개 배열 반환
    }
    
    async remove(id: number): Promise<void> {
        const exhibitionIntro = await this.findOne(id); // 존재 여부 확인
        await this.exhibitionIntroRepository.remove(exhibitionIntro);
    }
}