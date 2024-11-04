import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
// import { SampleRouter } from './routers/sample.router';
import { AuthRouter } from './routers/auth.router';
import { join } from 'path';
import { TransactionRouter } from './routers/transaction.router';
import { TenantRouter } from './routers/tenant.router';
import { PropertiesRouter } from './routers/properties.router';
import { RoomRouter } from './routers/room.router';
import { CategoryRouter } from './routers/category.router';
import { AvailabilityRouter } from './routers/availability.routes';
import { AvailabilityController } from './controllers/availability.controller';
import { PeakSeasonRouter } from './routers/PeakSeason.router';
export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));

    this.app.use(express.static(join(__dirname, '/public/images')));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send('Error !');
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    // const sampleRouter = new SampleRouter();

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });

    // this.app.use('/api/samples', sampleRouter.getRouter());
    this.app.use('/api/auth', new AuthRouter().getRouter());
    this.app.use('/api/order', new TransactionRouter().getRouter());
    this.app.use('/api/properti', new PropertiesRouter().getRouter());
    this.app.use('/api/tenant', new TenantRouter().getRouter());
    this.app.use('/api/room', new RoomRouter().getRouter());
    this.app.use('/api/category', new CategoryRouter().getRouter());
    this.app.use('/api/availability', new AvailabilityRouter().getRouter());
    this.app.use('/api/peak-season', new PeakSeasonRouter().getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
