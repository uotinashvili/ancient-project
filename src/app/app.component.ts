import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, ReplaySubject, takeUntil } from 'rxjs';
import { IUser, IWallet } from './box/model/box.model';
import { currentUserSelector, userLoadingSelector } from './box/store/box.selectors';
import { IAppState } from './box/store/box.state';
import { ApiService } from './shared/service/api.service';

import * as BoxActions from './box/store/box.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  loading$ = this._store.select(userLoadingSelector);
  currentUser!: IUser;

  onDestroy$: ReplaySubject<void> = new ReplaySubject<void>();

  get userBalance(): number {
    return this.currentUser.wallets.reduce((sum, a) => sum + a.amount, 0);
  }

  constructor(private _store: Store<IAppState>, private _apiService: ApiService) {}

  ngOnInit(): void {
    this._store.dispatch(BoxActions.getBoxes());
    this._store.dispatch(BoxActions.getCurrentUser());

    this._store
      .select(currentUserSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        filter((user) => !!user)
      )
      .subscribe((user: IUser) => {
        return (this.currentUser = user);
      });

    this._apiService.onUpdateWallet().pipe(takeUntil(this.onDestroy$)).subscribe((wallet: IWallet) => {
      this._store.dispatch(BoxActions.updateUserWalletSuccess({ wallet }));
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
