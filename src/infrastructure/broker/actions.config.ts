import { tagActions } from './actions/Tag.actions';
import { personActions } from './actions/Person.actions';

const actions = {
  ...tagActions,
  ...personActions,
};

export { actions };
