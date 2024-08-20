// http-client-providers.ts
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './services/auth.interceptor';

export const httpClientProviders: EnvironmentProviders = makeEnvironmentProviders([
  provideHttpClient(withInterceptors([authInterceptor]))
]);
