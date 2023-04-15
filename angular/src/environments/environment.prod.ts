import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'Ecommerce',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44331/',
    redirectUri: baseUrl,
    clientId: 'Ecommerce_App',
    responseType: 'code',
    scope: 'offline_access Ecommerce',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://localhost:44369',
      rootNamespace: 'Store.Ecommerce',
    },
  },
} as Environment;
