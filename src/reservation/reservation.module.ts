import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientService } from './client.service';
import { ReservationController } from './reservation.controller';
import Reservation from './reservation.model';
import { ReservationService } from './reservation.service';
import ReservationDTO from './reservationDTO.model';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Reservation, ReservationDTO])],
  controllers: [ReservationController],
  providers: [ReservationService, ClientService]
})
export class ReservationModule {}
