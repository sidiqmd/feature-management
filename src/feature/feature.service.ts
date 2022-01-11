import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetAccessDto } from './dto/get-access.dto';
import { UpdateAccessDto } from './dto/update-access.dto';
import { FeatureAccess } from './featureAccess.model';

@Injectable()
export class FeatureService {
  private featureAccessList: FeatureAccess[] = [
    {
      id: 1,
      featureName: 'Payroll Management',
      emails: ['sid@gmail.com'],
    },
    {
      id: 2,
      featureName: 'Leave Management',
      emails: [],
    },
    {
      id: 3,
      featureName: 'Staff Management',
      emails: [],
    },
    {
      id: 4,
      featureName: 'Claim Management',
      emails: [],
    },
    {
      id: 5,
      featureName: 'Trainig Management',
      emails: [],
    },
    {
      id: 6,
      featureName: 'Recruitment Management',
      emails: [],
    },
  ];

  // Return all from list
  getAllFeatureAccess(): FeatureAccess[] {
    return this.featureAccessList;
  }

  // Return access status only
  getFeatureAccess(getAccessDto: GetAccessDto): { canAccess: boolean } {
    // Find Feature from main list
    const featureAccess = this.featureAccessList.find(
      (access) => access.featureName === getAccessDto.featureName,
    );

    if (featureAccess) {
      // Found feature, check if email exists in the emails
      return {
        canAccess: featureAccess.emails.indexOf(getAccessDto.email) > -1,
      };
    } else {
      // Not Found feature, default false
      return {
        canAccess: false,
      };
    }
  }

  // Update access
  updateAccess(updateAccessDto: UpdateAccessDto): void {
    // Find Feature from main list
    const featureAccess = this.featureAccessList.find(
      (access) => access.featureName === updateAccessDto.featureName,
    );

    let updated = false;

    if (featureAccess && updateAccessDto.enable) {
      // Found and enabled
      if (featureAccess.emails.indexOf(updateAccessDto.email) === -1) {
        // Check if email already exists with this feature, if no then add
        featureAccess.emails.push(updateAccessDto.email);
        updated = true;
      }
    } else if (featureAccess && !updateAccessDto.enable) {
      // Found and disabled
      const index = featureAccess.emails.indexOf(updateAccessDto.email);
      // Check if email already exists with this feature, if yes then remove
      if (index > -1) {
        featureAccess.emails.splice(index, 1);
        updated = true;
      }
    }

    // return status 304 if list is not updated
    if (!updated) {
      throw new HttpException('Not Modified', HttpStatus.NOT_MODIFIED);
    }
  }
}
