import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GetAccessDto {
  @IsNotEmpty()
  @IsEmail({ message: 'Invalid email' })
  email: string;

  @IsNotEmpty({ message: 'FeatureName required' })
  @IsString()
  featureName: string;
}
