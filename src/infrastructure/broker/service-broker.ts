import { ServiceBroker } from 'moleculer';
import brokerOptions from './moleculer.config';

const broker: ServiceBroker = new ServiceBroker(brokerOptions);

broker.createService({
  name: 'register',
});

export default broker;
