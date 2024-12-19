import { Controller, UseGuards, Request } from '@nestjs/common';
import { ExhibitionService } from './exhibitions.service';
import { CreateExhibitionDto } from './dto/create-exhibition.dto';
import { Exhibition } from './entities/exhibition.entity';
import { Get, Post, Body, Query, Param, Delete,Patch, HttpException, HttpStatus } from '@nestjs/common';
import { UpdateExhibitionDto } from './dto/update-exhibition.dto';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('api/exhibitions')
export class ExhibitionController {
    constructor(private readonly exhibitionService: ExhibitionService) {}

    @Post('register')
    @Roles('admin')
    @UseInterceptors(FileInterceptor('file'))
    async create(
        // @Request() req,
        @Body() createExhibitionDto: CreateExhibitionDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<{ message: string; exhibition_id: number }> {
        const exhibition = await this.exhibitionService.create(createExhibitionDto, file);
        return { message: '등록이 완료되었습니다', exhibition_id: exhibition.id };
    }

    // 모든 전시 조회
    @Roles('admin')
    @Get()
    async findAll(): Promise<{ message: string; exhibitions: Exhibition[] }> {
        const exhibitions = await this.exhibitionService.findAll();
        return { message: '모든 전시 조회를 완료했습니다.', exhibitions };
    }

    // 특정 전시 조회
    @Get(':id')
    @Roles('admin')
    async findOne(
        @Param('id') id: number
    ): Promise<{ message: string; exhibition: Exhibition }> {
        const exhibition = await this.exhibitionService.findOne(id);
        return { message: '전시 조회를 완료했습니다.', exhibition };
    }

    // 내용이나 제목, 내용 + 제목 으로 키워드 조회
    @Get('search')
    async searchExhibitions(
        @Query('keyword') keyword: string,
        @Query('searchIn') searchIn: 'title' | 'description' | 'both',
    ): Promise<Exhibition[]> {
        return this.exhibitionService.searchExhibitions(keyword, searchIn);
    }

    // 날짜 시간순 정렬
    @Get('sorted-by-date')
    async getExhibitionsSortedByDate(
        @Query('order') order: 'ASC' | 'DESC' = 'ASC',
    ): Promise<Exhibition[]> {
        return this.exhibitionService.getExhibitionsSortedByDate(order);
    }

    // 기수별 정렬
    @Get('sorted-by-generation')
    async getExhibitionsSortedByGeneration(
        @Query('order') order: 'ASC' | 'DESC' = 'ASC',
    ): Promise<Exhibition[]> {
        return this.exhibitionService.getExhibitionsSortedByGeneration(order);
    }

    @Patch(':exhibition_title')
    // @Roles('admin')
    async update(
    @Param('exhibition_title') exhibitionTitle: string,
    @Body() body: UpdateExhibitionDto
    ): Promise<{ message: string }> {
    try {
        await this.exhibitionService.updateExhibition(
            exhibitionTitle,
            body
        );

        return { message: '전시 정보가 성공적으로 업데이트되었습니다.' };
    } catch (error) {
        if (error.message === '전시를 찾을 수 없습니다') {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        } else if (error.message === '전시 제목이 현재 제목과 동일합니다' || error.message === '전시 제목이 이미 존재합니다') {
            throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
        throw new HttpException('업데이트 중 오류가 발생했습니다', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Delete(':id')
    @Roles('admin')
    async remove(@Param('id') id: number): Promise<{ message: string }> {
        await this.exhibitionService.remove(id);
        return { message: '전시가 삭제되었습니다.' };
    }

    @Roles('admin')
    @Get('presigned-url/:exhibition_id')
    async getPresignedUrl(
        @Param('exhibition_id') exhibitionId: number
    ): Promise<{ url: string }> {
        // console.log(`Request for presigned URL for exhibition ID: ${exhibitionId}`);
        const url = await this.exhibitionService.getSignedUrl(exhibitionId);
        // console.log('Generated presigned URLs:', url);
        return { url };
    }
}