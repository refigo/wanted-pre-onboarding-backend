import { Module } from '@nestjs/common';
import { JobModule } from './job/job.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DatabaseModule,
    JobModule
  ],
})
export class AppModule {}
