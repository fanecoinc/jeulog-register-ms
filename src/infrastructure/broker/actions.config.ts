import { tagActions } from './actions/Tag.actions';
import { personActions } from './actions/Person.actions';
import { truckTrackActions } from './actions/TruckTrack.actions';

const actions = {
  ...tagActions,
  ...personActions,
  ...truckTrackActions,
};

export { actions };
