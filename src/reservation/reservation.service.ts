import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { last, lastValueFrom } from 'rxjs';
import { DeleteResult, Repository } from 'typeorm';
import { ClientService } from './client.service';
import Reservation from './reservation.model';

@Injectable()
export class ReservationService {

    constructor(
        @InjectRepository(Reservation)
            private repository: Repository<Reservation>, private clientService: ClientService) {
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
        Logger.log(reservation.client);
        let res =  await this.repository.save(reservation);
        if (res.status === 'CONFIRM') {
            const client = await this.clientService.findClientById(res.client);
            const value = await lastValueFrom(client);
            const invoice = await this.clientService.postInvoice(res, value);
            const value2 = await lastValueFrom(invoice);
        }
        return res
    }

    async changeStatus(status: string, id: string): Promise<any> {
        let changeSt = await this.repository.update(id, { status: status });
        if (status === 'CONFIRM') {
            let res = await this.repository.findOne(id, {relations: ["reservations"]});
            const client = await this.clientService.findClientById(res.client);
            const value = await lastValueFrom(client);
            const invoice = await this.clientService.postInvoice(res, value);
            const value2 = await lastValueFrom(invoice);
        }
        return changeSt;
    }

    async delete(id: number): Promise<DeleteResult> {
        return this.repository.delete(id);
    }

}
