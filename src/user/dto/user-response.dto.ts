import { UserRole } from "src/enums/user-role.enum";
import { User } from "../entities/user.entity";

export class UserResponseDto {
    id: number;
    user_name: string;
    account_id: string;
    email: string;
    user_role: UserRole;

    constructor(user: User) {
        this.id = user.id;
        this.user_name = user.user_name;
        this.account_id = user.account_id;
        this.email = user.email;
        this.user_role = user.user_role;
    }
}