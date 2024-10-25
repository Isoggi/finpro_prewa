import { Router } from 'express';
import { RoomController } from '@/controllers/room.controller';

export class RoomRouter {
  private router: Router = Router();
  private roomController = new RoomController();
  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.get('/:id', this.roomController.getById);
    this.router.post('/', this.roomController.createRoom); // Create
    this.router.put('/:id', this.roomController.updateRoom); // Update
    this.router.delete('/:id', this.roomController.deleteRoom); // Delete
  }

  public getRouter(): Router {
    return this.router;
  }
}
