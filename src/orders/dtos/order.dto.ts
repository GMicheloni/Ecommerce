/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ArrayNotEmpty, IsNotEmpty, IsUUID } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  @IsUUID()
  /**
   * @example "d9e17393-17f5-4d29-9208-8ee3cb2bbca1"
   * @description "tiene que ser un Uuid de un User registrado en la base de datos"
   */
  userId: string;
  @ArrayNotEmpty()
  /**
   * @example "[d9e17393-17f5-4d29-9208-8ee3cb2bbca1]"
   * @description "array de Uuids de productos registrados en la base de datos"
   */
  products: string[];
}
