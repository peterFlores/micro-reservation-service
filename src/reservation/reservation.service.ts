import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import Reservation from './reservation.model';

@Injectable()
export class ReservationService {

    constructor(
        @InjectRepository(Reservation)
            private repository: Repository<Reservation>) {
            }
    
    async findAll(): Promise<Reservation[]> {
        return await this.repository.find({relations: ["reservations"]});
    }

    async findById(id: number): Promise<Reservation> {
        return await this.repository.findOne(id);
    }

    async findByStatus(status: string): Promise<Reservation[]> {
        return await this.repository.find({
            where: { status: status },
            relations: ["reservations"]
        })
    }

    async findByUserId(id: string): Promise<Reservation[]> {
        return await this.repository.find({
            where: { client: id },
            relations: ["reservations"]
        })
    }
    async create(reservation: Reservation): Promise<Reservation> {
        return await this.repository.save(reservation);
    }

    async changeStatus(status: string, id: string): Promise<any> {
        return await this.repository.update(id, { status: status });
    }

    async delete(id: number): Promise<DeleteResult> {
        return this.repository.delete(id);
    }

}
