import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ApiService } from 'src/app/shared/service/api.service';
import * as BoxActions from './box.actions';

@Injectable()
export class BoxEffects {
  getBoxes$ = createEffect(() =>
    this._actions$.pipe(
      ofType(BoxActions.getBoxes),
      mergeMap(() => {
        return this._apiService.loadBoxes().pipe(
          map((boxes) => BoxActions.getBoxesSuccess({ boxes })),
          catchError((error) => of(BoxActions.getBoxesFailure({ error: error.message })))
        );
      })
    )
  );

  openBox$ = createEffect(() =>
    this._actions$.pipe(
      ofType(BoxActions.openBox.type),
      mergeMap((payload: any) => {
        return this._apiService.openBox(payload.input).pipe(
          map((boxOpenings) => BoxActions.openBoxSuccess({ boxOpenings })),
          catchError((error) => of(BoxActions.openBoxFailure({ error: error.message })))
        );
      })
    )
  );

  getCurrentUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(BoxActions.getCurrentUser),
      mergeMap(() => {
        return this._apiService.getCurrentUser().pipe(
          map((user) => BoxActions.getCurrentUserSuccess({ user })),
          catchError((error) => of(BoxActions.getCurrentUserFailure({ error: error.message })))
        );
      })
    )
  );

  constructor(private _actions$: Actions, private _apiService: ApiService) {}
}
