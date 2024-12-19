import { Controller, Post, Body, Get, Query, Res, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse } from 'src/common/api-response.dto';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);
    
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { id: string; password: string }): Promise<{ message: string; token: string }> {
        const token = await this.authService.login(body.id, body.password);
        return { message: token, token }; // 로그인 성공 시 메시지 또는 토큰 반환
    }


    @Get('kakao')
    requestKakaoLogin(@Res() res: Response) {
        const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${encodeURIComponent(process.env.KAKAO_REDIRECT_URI)}&response_type=code`;
        res.json({ redirectUrl: kakaoLoginUrl }); // 클라이언트에 리다이렉트 URL 반환
    }

    @Get('kakao/callback')
    async kakaoCallback(@Query('code') kakaoAuthResCode: string, @Res() res: Response) {
        try {
            const { jwtToken, user } = await this.authService.signInWithKakao(kakaoAuthResCode);
            // 클라이언트로 리다이렉트 및 JWT를 쿼리 파라미터로 전달
            const redirectUrl = `${process.env.FRONTEND_URL}/auth/kakao/callback?success=true&jwtToken=${jwtToken}`;
            res.redirect(redirectUrl);
        } catch (error) {
            console.error('Error during Kakao login processing:', error);
            res.status(500).json(new ApiResponse(false, 500, 'Kakao login failed', error));
        }
    }
}