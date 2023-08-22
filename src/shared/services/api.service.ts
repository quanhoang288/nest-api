import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  public async get(
    url: string,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return firstValueFrom(this.httpService.get(url, options));
  }

  public async post(
    url: string,
    data: object,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return firstValueFrom(this.httpService.post(url, data, options));
  }

  public async put(
    url: string,
    data: object,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return firstValueFrom(this.httpService.put(url, data, options));
  }

  public async delete(
    url: string,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return firstValueFrom(this.httpService.delete(url, options));
  }
}
