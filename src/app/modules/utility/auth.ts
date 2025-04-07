import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../Auth/register.interface';
import catchAsync from './catchAsync';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import AppError from '../../middleware/error/appError';
import httpStatus from 'http-status';
import { User } from '../Auth/register.model';
const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;
    console.log(token);
    let decoded;
    try {
      decoded = jwt.verify(token, config.ACCESS_SECRET as string) as JwtPayload;
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User is not authorized');
    }
    if (!decoded) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User is not authorized');
    }

    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'Your User Id is Invalid!');
    }

    if (requiredRole && !requiredRole?.includes(decoded?.role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'User does not have the required permissions',
      );
    }
    // @ts-expect-error user
    req.user = decoded;
    next();
  });
};

export default auth;
