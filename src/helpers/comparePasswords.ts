/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'ComparePasswords', async: false })
export class ComparePasswords implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    if (password !== (args.object as any)[args.constraints[0]]) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Passwords do not match!';
  }
}
