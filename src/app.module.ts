import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import Reservation from './reservation/reservation.model';
import { ReservationModule } from './reservation/reservation.module';
import ReservationDTO from './reservation/reservationDTO.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'hostal',
      password: 'hostal2021',
      database: 'hostal',
      dropSchema: true,
      entities: [Reservation, ReservationDTO],
      synchronize: true
    }),
    ReservationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
