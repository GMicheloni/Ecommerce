import { NextFunction, Request, Response } from 'express';

export function loggerglobal(req: Request, res: Response, next: NextFunction) {
  console.log(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `estas ejecutando un metodo ${req.method} en la ruta ${req.url} en la fecha: ${new Date()}`,
  );
  next();
}
