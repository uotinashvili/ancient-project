import { createReducer, on } from '@ngrx/store';

import { IBoxesState, IBoxState, IUserState } from './box.state';
import * as BoxActions from './box.actions';
import { IBox, IUser } from '../model/box.model';

export const boxesInitialState: IBoxesState = {
  loading: false,
  boxes: [],
  error: null,
};

export const boxInitialState: IBoxState = {
  opening: false,
  box: {} as IBox,
  boxOpenings: [],
  error: null,
};

export const userInitialState: IUserState = {
  loading: false,
  user: {} as IUser,
  error: null,
};

export const boxesReducer = createReducer(
  boxesInitialState,
  on(BoxActions.getBoxes, (state) => ({
    ...state,
    loading: true,
  })),
  on(BoxActions.getBoxesSuccess, (state, action) => ({
    ...state,
    loading: false,
    boxes: action.boxes,
  })),
  on(BoxActions.getBoxesFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  }))
);

export const boxReducer = createReducer(
  boxInitialState,
  on(BoxActions.openBox, (state) => ({
    ...state,
    opening: true,
  })),
  on(BoxActions.openBoxSuccess, (state, action) => ({
    ...state,
    opening: false,
    boxOpenings: action.boxOpenings,
  })),
  on(BoxActions.openBoxFailure, (state, action) => ({
    ...state,
    opening: false,
    error: action.error,
  })),
  on(BoxActions.clearBoxOpenings, (state) => ({
    ...state,
    boxOpenings: []
  }))
);

export const userReducer = createReducer(
  userInitialState,
  on(BoxActions.getCurrentUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(BoxActions.getCurrentUserSuccess, (state, action) => ({
    ...state,
    loading: false,
    user: action.user,
  })),
  on(BoxActions.getCurrentUserFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(BoxActions.updateUserWalletSuccess, (state, action) => ({
    ...state,
    user: {
      ...state.user,
      wallets: [action.wallet]
    }
  }))
);
