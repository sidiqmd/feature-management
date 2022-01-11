import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { GetAccessDto } from './dto/get-access.dto';
import { UpdateAccessDto } from './dto/update-access.dto';
import { FeatureService } from './feature.service';
import { FeatureAccess } from './featureAccess.model';

@Controller('feature')
export class FeatureController {
  constructor(private featureService: FeatureService) {}

  @Get('/all')
  getAllFeatureAccess(): FeatureAccess[] {
    return this.featureService.getAllFeatureAccess();
  }

  @Get()
  getFeatureAccess(@Query() getAccessDto: GetAccessDto): {
    canAccess: boolean;
  } {
    return this.featureService.getFeatureAccess(getAccessDto);
  }

  @Post()
  @HttpCode(200)
  updateAccess(@Body() updateAccessDto: UpdateAccessDto): void {
    return this.featureService.updateAccess(updateAccessDto);
  }
}
