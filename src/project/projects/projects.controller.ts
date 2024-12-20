import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UseGuards, Patch, Request } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ApprovedStudentGuard } from '../../auth/project.approved.guard';
@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('api/projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}
 
    @Post('register')
    @Roles('admin','instructor')
    async create(@Body() createProjectDto: CreateProjectDto): Promise<{ message: string; data: Project }> {
        const data = await this.projectsService.create(createProjectDto);
        return {
            message: "프로젝트를 생성했습니다",
            data: data,
        };
    }

    @Get()
    async findAll(): Promise<Project[]> {
        return await this.projectsService.findAll();
    }

    @Patch(':id/update')
    @Roles('instructor','admin','student')
    @UseGuards(ApprovedStudentGuard)
    async update(@Param('id',ParseIntPipe) id: number, @Body() updateProjectDto: UpdateProjectDto, @Request() req) {
        const loginedUser = req.user.user_id;
        const updatedData = await this.projectsService.update(id, updateProjectDto, loginedUser);
        return {
            message: "프로젝트가 수정되었습니다.",
            data: updatedData,
        };
    }

    @Delete(':id/delete')
    @Roles('admin', 'instructor')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string; data: any; }> {
        const data = await this.projectsService.remove(id);
        return {
            message: "프로젝트가 삭제되었습니다.",
            data: data,
        };
    }
}