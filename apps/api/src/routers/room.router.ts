import { Router } from 'express';
import { RoomController } from '@/controllers/room.controller';
import { uploader } from '@/libs/uploader.lib';

export class RoomRouter {
  private router: Router = Router();
  private roomController = new RoomController();
  private uploadMiddleware = uploader('room', 'rooms');

  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.get('/:slug', this.roomController.getById);
    this.router.post(
      '/',
      this.uploadMiddleware.single('image'),
      this.roomController.createRoom,
    );
    this.router.put(
      '/:id',
      this.uploadMiddleware.single('image'),
      this.roomController.updateRoom,
    );
    this.router.delete('/:id', this.roomController.deleteRoom);
  }

  public getRouter(): Router {
    return this.router;
  }
}
