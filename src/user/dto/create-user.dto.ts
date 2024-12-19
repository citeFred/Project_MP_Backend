import { IsString, IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { UserRole } from 'src/enums/user-role.enum';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    user_name: string;

    @IsString()
    @IsNotEmpty()
    account_id: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    passwordConfirm: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    
    @IsString()
    @IsNotEmpty()
    nick_name: string;

    @IsEnum(UserRole)
    user_role: UserRole;

    validatePasswords() {
        if (this.password !== this.passwordConfirm) {
            throw new Error('Passwords do not match');
        }
    }
}