import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateAccessDto {
  @IsNotEmpty({ message: 'FeatureName required' })
  @IsString()
  featureName: string;

  @IsNotEmpty()
  @IsEmail({ message: 'Invalid email' })
  email: string;

  @IsBoolean()
  enable: boolean;
}
