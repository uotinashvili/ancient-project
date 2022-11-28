import { createSelector } from '@ngrx/store';
import { IAppState } from './box.state';

// Boxes Selectors
export const selectBoxesFeature = (state: IAppState) => state.boxes;

export const boxesLoadingSelector = createSelector(selectBoxesFeature, (state) => state.loading);

export const boxesSelector = createSelector(selectBoxesFeature, (state) => state.boxes);

export const boxesErrorSelector = createSelector(selectBoxesFeature, (state) => state.error);

export const currentBoxSelector = (id: string) =>
  createSelector(selectBoxesFeature, (state) => state.boxes.find((box) => box.id === id));

// Box Selectors
export const selectBoxFeature = (state: IAppState) => state.box;

export const boxOpeningSelector = createSelector(selectBoxFeature, (state) => state.opening);

export const boxOpeningsSelector = createSelector(selectBoxFeature, (state) => state.boxOpenings);

export const boxErrorSelector = createSelector(selectBoxFeature, (state) => state.error);

// User Selectors
export const selectUserFeature = (state: IAppState) => state.user;

export const userLoadingSelector = createSelector(selectUserFeature, (state) => state.loading);

export const currentUserSelector = createSelector(selectUserFeature, (state) => state.user);

export const userErrorSelector = createSelector(selectUserFeature, (state) => state.error);
