import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationController } from './reservation.controller';
import Reservation from './reservation.model';
import { ReservationService } from './reservation.service';
import ReservationDTO from './reservationDTO.model';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, ReservationDTO])],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule {}
