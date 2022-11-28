import { boxesReducer, boxReducer, userReducer } from '../../box/store/box.reducer';

export const reducers = {
  boxes: boxesReducer,
  box: boxReducer,
  user: userReducer,
};
