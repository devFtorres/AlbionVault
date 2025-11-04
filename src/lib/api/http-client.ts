/**
 * HTTP Client with retry, caching, and rate limiting
 * Cliente HTTP com retry, cache e rate limiting
 */

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { ApiError } from '@/types/common.types';
import {
  ApiConfig,
  CacheConfig,
  CachedData,
  RateLimitConfig,
  RateLimitState,
} from '@/types/api.types';

export class HttpClient {
  private client: AxiosInstance;
  private cache: Map<string, CachedData<any>>;
  private cacheConfig: CacheConfig;
  private rateLimitState: RateLimitState;
  private rateLimitConfig: RateLimitConfig;

  constructor(
    config: ApiConfig,
    cacheConfig: CacheConfig = { ttl: 5 * 60 * 1000 }, // 5 minutes default
    rateLimitConfig: RateLimitConfig = {
      maxRequests: 300,
      windowMs: 60 * 1000,
    } // 300 req/min default
  ) {
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout || 30000,
      headers: config.headers || {},
    });

    this.cache = new Map();
    this.cacheConfig = cacheConfig;
    this.rateLimitState = { count: 0, resetAt: Date.now() };
    this.rateLimitConfig = rateLimitConfig;

    this.setupInterceptors(config.retries || 3);
  }

  private setupInterceptors(retries: number) {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        this.checkRateLimit();
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor with retry logic
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const config = error.config;

        if (!config || !config.retry) {
          config.retry = 0;
        }

        if (
          config.retry < retries &&
          this.shouldRetry(error)
        ) {
          config.retry += 1;
          const delay = this.getRetryDelay(config.retry);
          await this.sleep(delay);
          return this.client.request(config);
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  private shouldRetry(error: any): boolean {
    // Retry on network errors or 5xx server errors
    return (
      !error.response ||
      (error.response.status >= 500 && error.response.status <= 599) ||
      error.code === 'ECONNABORTED' ||
      error.code === 'ETIMEDOUT'
    );
  }

  private getRetryDelay(retryCount: number): number {
    // Exponential backoff: 1s, 2s, 4s
    return Math.min(1000 * Math.pow(2, retryCount - 1), 4000);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private checkRateLimit() {
    const now = Date.now();

    // Reset rate limit if window has passed
    if (now > this.rateLimitState.resetAt) {
      this.rateLimitState = {
        count: 0,
        resetAt: now + this.rateLimitConfig.windowMs,
      };
    }

    // Check if rate limit exceeded
    if (this.rateLimitState.count >= this.rateLimitConfig.maxRequests) {
      const waitTime = this.rateLimitState.resetAt - now;
      throw new ApiError(
        429,
        `Rate limit exceeded. Please wait ${Math.ceil(waitTime / 1000)}s`,
        { retryAfter: waitTime }
      );
    }

    this.rateLimitState.count++;
  }

  private handleError(error: any): ApiError {
    if (error instanceof ApiError) {
      return error;
    }

    if (error.response) {
      return new ApiError(
        error.response.status,
        error.response.data?.message ||
          error.message ||
          'An error occurred',
        error.response.data
      );
    }

    return new ApiError(500, error.message || 'Network error');
  }

  private getCacheKey(url: string, params?: any): string {
    return `${url}${params ? JSON.stringify(params) : ''}`;
  }

  private getFromCache<T>(key: string): T | null {
    const cached = this.cache.get(key);

    if (!cached) return null;

    // Check if cache expired
    if (Date.now() > cached.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  private setCache<T>(key: string, data: T) {
    const now = Date.now();
    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + this.cacheConfig.ttl,
    });

    // Simple cache size management
    if (
      this.cacheConfig.maxSize &&
      this.cache.size > this.cacheConfig.maxSize
    ) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig & { useCache?: boolean }
  ): Promise<T> {
    const useCache = config?.useCache !== false; // default true
    const cacheKey = this.getCacheKey(url, config?.params);

    // Check cache
    if (useCache) {
      const cached = this.getFromCache<T>(cacheKey);
      if (cached) return cached;
    }

    const response: AxiosResponse<T> = await this.client.get(url, config);

    // Set cache
    if (useCache) {
      this.setCache(cacheKey, response.data);
    }

    return response.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(
      url,
      data,
      config
    );
    return response.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(
      url,
      data,
      config
    );
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(
      url,
      config
    );
    return response.data;
  }

  clearCache(key?: string) {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }
}
