import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashService } from '../auth/hash.service';
import { ProjectsModule } from '../project/projects/projects.module'; 
import * as dotenv from 'dotenv';
import { ExhibitionModule } from 'src/exhibition/exhibitions/exhibitions.module';
import { ExhibitionsDocModule } from 'src/exhibition/exhibitions_doc/exhibitions_doc.module';
import { CourseDocModule } from 'src/course/course_doc/course_doc.module';
import { DocNameModule } from 'src/course/doc_name/doc_name.module';
import { ProjectDocModule } from 'src/project/project_doc/project_doc.module';
import { FeedbackModule } from 'src/project/feedback/feedback.module';
import { CoursesModule } from 'src/course/courses/courses.module';
import { User } from './entities/user.entity';
dotenv.config();

 @Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => ProjectsModule),
        forwardRef(() => ExhibitionModule),
        forwardRef(() => ExhibitionsDocModule),
        forwardRef(() => CourseDocModule),
        forwardRef(() => DocNameModule),
        forwardRef(() => ProjectDocModule),
        forwardRef(() => FeedbackModule),
        forwardRef(() => CoursesModule),
    ],
    providers: [UsersService,HashService],
    controllers: [UsersController],
    exports: [UsersService,HashService, TypeOrmModule.forFeature([User])],
})
export class UsersModule {}