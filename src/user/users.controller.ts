import { Controller, Get, Post, Body, Param, Delete, Put, HttpException, Req, Res, HttpStatus, UseGuards, Request, BadRequestException, ConflictException } from '@nestjs/common';//추가
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OwnershipGuard } from '../auth/ownership.guard';
import { User } from './entities/user.entity';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService,
    ) {}
    
    @Post('register')
    async create(@Body() createUserDto: CreateUserDto): Promise<{ message: string; user?: User }> {
        try {
            const user = await this.usersService.create(createUserDto);
            return { message: '회원가입이 완료되었습니다.', user };
        } catch (error) {
            if (error instanceof ConflictException) {
                throw new ConflictException(error.message);
            } else if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }
            throw new BadRequestException('회원가입 중 오류가 발생했습니다.');
        }
    }
    @Get()
    async findAll(): Promise<{ message: string; users: User[] }> {
        const users = await this.usersService.findAll();
        return { message: '모든 사용자 조회를 완료했습니다.', users };
    }

    @Get(':id')
    async findOne(@Param('id') userId: number): Promise<{ message: string; user: User }> {
        const user = await this.usersService.findOne(userId);
        return { message: '사용자 조회를 완료했습니다.', user };
    }

    @Get(':id')
    async findUserWithCourseAndCourseRegistration(
        @Param('id') userId: number
    ): Promise<{ message: string; user: User }> {
        const user = await this.usersService.findUserWithCourseAndCourseRegistration(userId);
        return { message: '사용자 조회를 완료했습니다.', user };
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard,OwnershipGuard)
    async remove(@Param('id') id: number): Promise<{ message: string }> {
        await this.usersService.remove(id);
        return { message: '사용자가 삭제되었습니다.' };
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard,OwnershipGuard)
    async update(
        @Param('userid') userId: number,
        @Body() body: { email: string; password?: string; nick_name: string;}
    ): Promise<{ message: string }> {
        const user = await this.usersService.findOne(userId);

        if (!user) {
            throw new HttpException('사용자를 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
        }

        const result = await this.usersService.update(userId, body.email, body.password, body.nick_name);

        return { message: result };
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard,OwnershipGuard)
    async logout(@Req() request: Request, @Res() response: Response) {
      // JWT 토큰을 담고 있는 쿠키를 삭제
      response.clearCookie('token'); // 'token'은 쿠키의 이름입니다.
      
      // 로그아웃 성공 메시지 반환
      return response.json({ message: '로그아웃 성공' });
    }
}