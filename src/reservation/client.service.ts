import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { response } from "express";
import { map, Observable } from "rxjs";

@Injectable()
export class ClientService {
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

}