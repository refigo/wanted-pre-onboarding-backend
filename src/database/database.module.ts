import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST') || 'localhost',
        port: configService.get('DB_PORT') || 5432,
        username: configService.get('DB_USER') || 'postgres',
        password: configService.get('DB_PASS') || 'postgres',
        database: configService.get('DB_NAME') || 'test',
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true
      }),
    }),
  ],
})
export class DatabaseModule {}
