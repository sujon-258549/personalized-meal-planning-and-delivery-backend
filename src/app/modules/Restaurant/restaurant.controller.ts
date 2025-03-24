import { Request, Response } from 'express';
import catchAsync from '../utility/catchAsync';
import sendSuccess from '../utility/send-success';
import { restaurantServices } from './restaurant.services';
import httpStatus from 'http-status';
const createMenuForDay = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await restaurantServices.createMenuForDayIntoDB(
    data,
    req?.user,
  );
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'Menu Create successfully',
    data: result,
  });
});
const findMyMenu = catchAsync(async (req: Request, res: Response) => {
  const result = await restaurantServices.findMyMenuForDayIntoDB(req?.user);
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'My Menu retrieved successfully',
    data: result,
  });
});

export const restaurantController = { createMenuForDay, findMyMenu };
