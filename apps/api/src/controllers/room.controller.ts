import { Request, Response, NextFunction } from 'express';
import { RoomService } from '@/services/room.service';
export class RoomController {
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await RoomService.getByIdService(req);
      return res
        .status(200)
        .json({ message: 'Get Room By Id Success', data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await RoomService.get(req);
      return res.status(200).json({ message: 'Get Room', data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async createRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await RoomService.createRoom(req);
      return res.status(200).json({ data, message: 'Create Room Success' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await RoomService.updateRoom(req);
      return res.status(200).json({ data, message: 'Update Room Success' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await RoomService.deleteRoom(req);
      return res.status(200).json({ data, message: 'Delete Room Success' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
