import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'src/configs/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig)
  ],
})
export class DatabaseModule {}
