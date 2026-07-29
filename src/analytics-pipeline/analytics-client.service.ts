import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { StudentFeatureVector } from './analytics-pipeline.service';

export interface ModelPrediction {
  riskScore: number;
  modelVersion: string;
  contributingFactors?: Record<string, number>;
}

@Injectable()
export class AnalyticsClientService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async predictClassicalMl(
    features: StudentFeatureVector,
  ): Promise<ModelPrediction> {
    return this.predict('/predict/classical', features);
  }

  async predictDeepLearning(
    features: StudentFeatureVector,
  ): Promise<ModelPrediction> {
    return this.predict('/predict/deep-learning', features);
  }

  private async predict(
    path: string,
    features: StudentFeatureVector,
  ): Promise<ModelPrediction> {
    const baseUrl = this.configService.get<string>('analyticsService.baseUrl');
    const apiKey = this.configService.get<string>('analyticsService.apiKey');

    try {
      const response = await firstValueFrom(
        this.httpService.post<ModelPrediction>(`${baseUrl}${path}`, features, {
          headers: apiKey ? { 'x-api-key': apiKey } : undefined,
        }),
      );
      return response.data;
    } catch (error) {
      throw new ServiceUnavailableException(
        `Analytics service request to ${path} failed: ${(error as AxiosError).message}`,
      );
    }
  }
}
