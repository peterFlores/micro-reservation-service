import { HttpService } from "@nestjs/axios";
import { HttpException, Injectable, Logger } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { response } from "express";
import { catchError, map, Observable } from "rxjs";
import Reservation from "./reservation.model";

@Injectable()
export class ClientService {
    private CLIENT = 'http://137.135.92.123:3001/api/v1/client';
    private INVOICE = 'http://137.135.92.123:3006/api/v1/invoice';
    private HOSTAL = 'http://localhost:3004/api/v1/hostal';
    
    constructor(private httpService: HttpService) {}

    findByAll(): Observable<any> {
        return this.httpService.get(`${this.HOSTAL}`).pipe(
            map(response => response.data)
        );
    }

    updateRoom(hostal: string, room: string, type: string): Observable<any> {
        const body = {
            hostal: hostal,
            room: room,
            type: type
        };
        return this.httpService.post(`${this.HOSTAL}/updateRoom`).pipe(
            map(response => response.data)
        );
    }

    findClientById(id) {
        return this.httpService.get(`${this.CLIENT}/id/${id}`).pipe(
            map(response => response.data)
        );
    }

    postInvoice(model: Reservation, dataClient) {
        const body = {
           email: dataClient.email,
           cliente: dataClient.first_name + dataClient.last_name,
           transactionId: model.id,
           check_in: model.reservations[0].check_in,
           check_out: model.reservations[0].check_out,
           hostal_name: model.reservations[0].hostal_name,
           room_name: model.reservations[0].room_name,
           nights: model.reservations[0].nights ,
           adults: model.reservations[0].adults,
           childs: model.reservations[0].childs,
           total: model.total
        };
        const headersRequest = {
            'Content-Type': 'application/json', // afaik this one is not needed
        };
        Logger.log(body);
        return this.httpService.post(`${this.INVOICE}/generateInvoice`, body, { headers: headersRequest }).pipe(
            map(response => response.data)
        );
    }

}