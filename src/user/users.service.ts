import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashService } from '../auth/hash.service';
import { ConflictException } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>, private readonly hashService: HashService,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { password, passwordConfirm } = createUserDto;
    
        if (password !== passwordConfirm) {
            throw new BadRequestException('비밀번호가 일치하지 않습니다.');
        }
    
        const existingUser = await this.usersRepository.findOne({
            where: [
                { email: createUserDto.email },
                { nick_name: createUserDto.nick_name },
                { account_id: createUserDto.account_id }
            ]
        });
    
        if (existingUser) {
            if (existingUser.email === createUserDto.email) {
                throw new ConflictException('이미 사용 중인 이메일입니다.');
            }
            if (existingUser.nick_name === createUserDto.nick_name) {
                throw new ConflictException('이미 사용 중인 닉네임입니다.');
            }
            if (existingUser.account_id === createUserDto.account_id) {
                throw new ConflictException('이미 사용 중인 ID입니다.');
            }
        }
    
        if (!createUserDto.password) {
            throw new BadRequestException('비밀번호가 필요합니다.');
        }
    
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.usersRepository.create({ ...createUserDto, password: hashedPassword });
        return await this.usersRepository.save(user);
    }
    
    
    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return await this.usersRepository.findOne({ where: { id: id } });
    }

    async findUserWithCourseAndCourseRegistration(id: number): Promise<User> {
        return await this.usersRepository.findOne({
            where: { id: id },
            relations: ['']
        })
    }
    
    async remove(id: number): Promise<void> {
        const userId = await this.findOne(id);
        await this.usersRepository.remove(userId);
    }


    async update(id: number, email?: string, password?: string, nick_name?: string ): Promise<string> {
        const user = await this.usersRepository.findOne({ where: { id: id } });

        if (!user) {
            throw new HttpException('사용자를 찾을 수 없습니다', HttpStatus.NOT_FOUND); // 사용자 미존재 시 예외 처리
        }
    
        // 이메일 중복 검사
        if (email) {
            const existingEmailUser = await this.usersRepository.findOne({ where: { email } });
            if (existingEmailUser && existingEmailUser.id !== id) {
                throw new HttpException('이메일이 이미 존재합니다', HttpStatus.CONFLICT); // 이메일 중복 시 예외 처리
            }
        }
    
        // 비밀번호가 제공된 경우에만 해싱 처리
        if (password) {
            const hashedPassword = await this.hashService.hashPassword(password);
            user.password = hashedPassword; // 해싱된 비밀번호 저장
        }
    
        // 사용자 정보 업데이트
        user.email = email;
        user.nick_name = nick_name;

        await this.usersRepository.save(user); // 업데이트된 사용자 정보 저장
    
        return 'User updated successfully'; // 성공 메시지 반환
    }
}