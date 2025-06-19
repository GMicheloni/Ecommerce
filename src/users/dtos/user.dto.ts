/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { ComparePasswords } from 'src/helpers/comparePasswords';

export class CreateUserDto {
  /**
   * @example "Gianfranco Micheloni"
   * @description "nombre completo"
   */
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;
  /**
   * @example "españa5058"
   * @description "direccion de tu hogar"
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  address: string;
  /**
   * @example "15206072@Gian"
   * @description "Contraseña con simbolos y una mayuscula y minuscula incluida y al menos un numero"
   */
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.',
  })
  @MinLength(8)
  @MaxLength(15)
  password: string;
  /**
   * @example "15206072@Gian"
   * @description "Contraseña igual a la ingresada anteriormente"
   */
  @IsNotEmpty()
  @Validate(ComparePasswords, ['password'])
  confirmpassword: string;
  /**
   * @example "gmicheloni52@gmail.com"
   * @description "Correo electronico de uso personal"
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;
  /**
   * @example 3764822287
   * @description "Numero de telefono"
   */
  @IsNumber()
  @IsNotEmpty()
  phone: number;
  /**
   * @example "Argentina"
   * @description "Pais en el que te encuentras"
   */
  @MinLength(5)
  @MaxLength(20)
  country: string;
  /**
   * @example "Posadas"
   * @description "Ciudad en la que vives actualmente"
   */
  @MinLength(5)
  @MaxLength(20)
  city: string;
}

export class LoginDto {
  /**
   * @example "15206072@Gian"
   * @description "contraseña con la que te registraste"
   */
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.',
  })
  @MinLength(8)
  @MaxLength(15)
  password: string;
  /**
   * @example "gmicheloni52@gmail.com"
   * @description "correo con el que te registraste"
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class updateUserDto {
  /**
   * @example "Gianfranco Micheloni"
   * @description "nombre completo"
   */
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;
  /**
   * @example "españa5058"
   * @description "direccion de tu hogar"
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
   * @example "gmicheloni52@gmail.com"
   * @description "Correo electronico de uso personal"
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;
  /**
   * @example 3764822287
   * @description "Numero de telefono"
   */
  @IsNumber()
  @IsNotEmpty()
  phone: number;
  /**
   * @example "Argentina"
   * @description "Pais en el que te encuentras"
   */
  @MinLength(5)
  @MaxLength(20)
  country: string;
  /**
   * @example "Posadas"
   * @description "Ciudad en la que vives actualmente"
   */
  @MinLength(5)
  @MaxLength(20)
  city: string;
}
