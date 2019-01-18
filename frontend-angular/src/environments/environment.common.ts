/**
 * This file is manage that declare common server meta data
 * such as context-path and provides type of instance needed to environment.
 */

export const commonServerMetaData = {
  contextPath: '/mommoo-portfolio'
};

export interface ServerMetaData {
  readonly protocol: string;
  readonly hostName: string;
  readonly portNumber: string;
  readonly contextPath: string;
}

export interface Environment {
  readonly production: boolean;
  readonly serverMetaData: ServerMetaData;
}
