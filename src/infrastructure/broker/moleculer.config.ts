import { BrokerOptions } from 'moleculer';

const brokerOptions: BrokerOptions = {
  nodeID: 'register-service-node',
  transporter: 'NATS',
  logLevel: 'info',
  requestTimeout: 5000,
  retryPolicy: {
    enabled: true,
    retries: 3,
    delay: 2000,
  },
  cacher: 'Memory',
  validator: false,
};

export default brokerOptions;
