import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormModule } from './form/form.module';
import { ProjectsModule } from './projects/projects.module';
import { Projects } from './projects/projects.entity';
import { StudioformModule } from './studioform/studioform.module';
import { StudioprojectsModule } from './studioprojects/studioprojects.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { InnovationMailModule } from './innovationmail/innovationmail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'enid-innovations',
      entities: [Projects],
      autoLoadEntities: true,
      synchronize: true, // ⚠️ only in development
    }),
    FormModule,
    ProjectsModule,
    StudioformModule,
    StudioprojectsModule,
    UserModule,
    AuthModule,
    InnovationMailModule,
  ],
  controllers: [AuthController],
})
export class AppModule {}
