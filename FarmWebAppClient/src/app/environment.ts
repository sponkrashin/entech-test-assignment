import { InjectionToken } from '@angular/core';
import { environment as env } from '../environments/environment';

export { Environment } from '../environments/environmentInterface';

export const ENVIRONMENT_TOKEN = new InjectionToken('environment', {
  providedIn: 'root',
  factory: () => env,
});
