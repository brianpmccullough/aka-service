import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { appConfig, validateConfig } from './config/app.config';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validate: validateConfig,
    }),
    HealthModule,
  ],
})
export class AppModule {}
