import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntil, filter, ReplaySubject, switchMap } from 'rxjs';
import { IBox, IBoxOpening, IOpenBoxInput } from '../../model/box.model';
import {
  boxErrorSelector,
  boxesLoadingSelector,
  boxOpeningSelector,
  boxOpeningsSelector,
  currentBoxSelector,
} from '../../store/box.selectors';
import { IAppState } from '../../store/box.state';
import * as BoxActions from '../../store/box.actions';

@Component({
  selector: 'app-box-detail',
  templateUrl: './box-detail.component.html',
  styleUrls: ['./box-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxDetailComponent implements OnInit, OnDestroy {
  box!: IBox;
  boxOpenings: IBoxOpening[] = [];

  loading$ = this._store.select(boxesLoadingSelector);
  opening$ = this._store.select(boxOpeningSelector);
  boxOpenings$ = this._store.select(boxOpeningsSelector);
  error$ = this._store.select(boxErrorSelector);

  onDestroy$: ReplaySubject<void> = new ReplaySubject<void>();

  constructor(private _store: Store<IAppState>, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.params
      .pipe(
        filter((params: Params) => !!params['id']),
        switchMap((params: Params) => {
          return this._store.select(currentBoxSelector(params['id'])).pipe(
            takeUntil(this.onDestroy$),
            filter((box) => !!box)
          );
        })
      )
      .subscribe((box: IBox | undefined) => {
        this.box = box as IBox;
      });

    this.boxOpenings$.pipe(takeUntil(this.onDestroy$)).subscribe((openings: IBoxOpening[]) => {
      this.boxOpenings = openings;
    });

    this.error$
      .pipe(
        takeUntil(this.onDestroy$),
        filter((error) => !!error)
      )
      .subscribe();
  }

  openBox(): void {
    this._store.dispatch(
      BoxActions.openBox({ input: <IOpenBoxInput>{ boxId: this.box.id, amount: 1 } })
    );
  }

  ngOnDestroy(): void {
    this._store.dispatch(BoxActions.clearBoxOpenings());
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
