import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientService } from './reservation/client.service';
import Reservation from './reservation/reservation.model';
import { ReservationModule } from './reservation/reservation.module';
import ReservationDTO from './reservation/reservationDTO.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '137.135.92.123',
      port: 3306,
      username: 'hostal',
      password: 'Hostal2021@',
      database: 'hostal',
      dropSchema: false,
      entities: [Reservation, ReservationDTO],
      synchronize: true
    }),
    ReservationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
