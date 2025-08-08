import { tagActions } from './actions/Tag.actions';
import { personActions } from './actions/Person.actions';
import { truckTrackActions } from './actions/TruckTrack.actions';
import { cartActions } from './actions/Cart.actions';
import { truckSetActions } from './actions/TruckSet.actions';

const actions = {
  ...tagActions,
  ...personActions,
  ...truckTrackActions,
  ...cartActions,
  ...truckSetActions,
};

export { actions };
