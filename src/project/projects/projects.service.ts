import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectRegistration } from '../project_registration/entities/registration.entity';
import { User } from 'src/user/entities/user.entity';
import { RegistrationStatus } from 'src/enums/registration-status.enum';

@Injectable()
export class ProjectsService {
    private readonly logger = new Logger(ProjectsService.name);
    constructor(
        @InjectRepository(Project)
        private readonly projectsRepository: Repository<Project>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(ProjectRegistration)
        private readonly projectRegistrationRepository: Repository<ProjectRegistration>,
    ) {}

    async isApprovedStudent(loginedUserId: number, projectId: number): Promise<boolean> {
        const registration = await this.projectRegistrationRepository.findOne({
            where: {
                user: { id: loginedUserId },
                project: { id: projectId },
                registration_status: RegistrationStatus.APPROVED,
            },
        });
        return !!registration;
    }    

    async create(createProjectDto: CreateProjectDto): Promise<Project> {
        const { topic } = createProjectDto;
    
        // title이 중복되는지 확인
        const existingtitle = await this.projectsRepository.findOne({ where: { topic } });
    
        if (existingtitle) {
            throw new ConflictException(`topic은(는) 이미 존재합니다.`);
        }
    
        const project = this.projectsRepository.create(createProjectDto);
        return this.projectsRepository.save(project);
    }
    
    async findAll(): Promise<Project[]> {
        return this.projectsRepository.find();
    }
    
    async findOne(id: number): Promise<Project> {
        const project = await this.projectsRepository.findOne({ where: { id: id } });
        if (!project) {
            if (!project) {
                this.logger.warn(`Project with ID ${id} not found`);
                throw new NotFoundException(`Project with ID ${id} not found`);
            }
        }
        return project;
    }
    
    async update(id: number, updateProjectDto: UpdateProjectDto, loginedUser:number): Promise<Project> {
        const project = await this.findOne(id);

        // 해당 프로젝트에 대한 승인된 학생인지
        const approvedStudent = await this.isApprovedStudent(loginedUser, id);

        if (!approvedStudent) {
            throw new ConflictException(`수정 권한이 없습니다.`);
        }
    
        const { team_name, topic } = updateProjectDto;

        // 팀 이름 중복 확인 (현재 프로젝트를 제외하고)
        if (team_name) {
            const existingTeam = await this.projectsRepository.findOne({
                where: { team_name },
            });
            if (existingTeam && existingTeam.id !== id) {
                throw new ConflictException(`${team_name}팀은(는) 이미 존재합니다.`);
            }
        }
    
        // 타이틀 중복 확인 (현재 프로젝트를 제외하고)
        if (topic) {
            const existingTitle = await this.projectsRepository.findOne({
                where: { topic },
            });
            if (existingTitle && existingTitle.id !== id) {
                throw new ConflictException(`프로젝트 topic이(가) 이미 존재합니다.`);
            }
        }
        
        Object.assign(project, updateProjectDto);
        return this.projectsRepository.save(project);
    }
    
    async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.projectsRepository.delete(id);
    }
}    