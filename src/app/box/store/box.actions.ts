import { createAction, props } from '@ngrx/store';
import { IBox, IBoxOpening, IOpenBoxInput, IUser, IWallet } from '../model/box.model';

// Boxes actions
export const getBoxes = createAction('[Boxes] Get Boxes');

export const getBoxesSuccess = createAction(
  '[Boxes] Get Boxes Success',
  props<{ boxes: IBox[] }>()
);

export const getBoxesFailure = createAction(
  '[Boxes] Get Boxes Failure',
  props<{ error: string }>()
);

// Open Box actions
export const openBox = createAction('[Box] Open Box', props<{ input: IOpenBoxInput }>());

export const openBoxSuccess = createAction(
  '[Box] Open Box Success',
  props<{ boxOpenings: IBoxOpening[] }>()
);

export const openBoxFailure = createAction('[Box] Open Box Failure', props<{ error: string }>());

export const clearBoxOpenings = createAction('[Box] Clear Box Openings');

// Users actions
export const getCurrentUser = createAction('[User] Get Current User');

export const getCurrentUserSuccess = createAction(
  '[User] Get Current User Success',
  props<{ user: IUser }>()
);

export const getCurrentUserFailure = createAction(
  '[User] Get Current User Failure',
  props<{ error: string }>()
);

export const updateUserWalletSuccess = createAction(
  '[User] Update User Wallet Success',
  props<{ wallet: IWallet }>()
);
