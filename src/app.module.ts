import { Module } from '@nestjs/common';
import { FeatureModule } from './feature/feature.module';

@Module({
  imports: [FeatureModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
