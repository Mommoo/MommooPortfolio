import {commonServerMetaData, Environment} from './environment.common';

export const environment: Environment = {
  production: true,
  serverMetaData: {
    protocol: 'https',
    hostName: 'mommoo.co.kr',
    portNumber: '443',
    ...commonServerMetaData
  }
};
