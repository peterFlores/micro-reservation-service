import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import Reservation from './reservation.model';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {


    constructor(private readonly service: ReservationService) {}

    @Get()
    async findAll() {
        return await this.service.findAll();
    }

    @Get(':id')
    async findByEmail(@Param('id') id: number) {
        return await this.service.findById(id);
    }

    @Get('/user/:id')
    async findByUserId(@Param('id') id: string) {
        return await this.service.findByUserId(id);
    }

    @Get('/status/:status')
    async findByPendingConfirmation(@Param('status') status: string) {
        return await this.service.findByStatus(status);
    }

    @Put('/changeStatus/:id')
    async changeStatus(@Param('id') id: string, @Body() model: any) {
        return await this.service.changeStatus(model.status, id);
    }
    @Post()
    async create(@Body() model: Reservation) {
        Logger.log(model)
        return await this.service.create(model);
    }

   
    @Delete(':id')
    async delete (@Param('id') id: number) {
        return await this.service.delete(id);
    } 
}
