import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import { boxesSelector, boxesLoadingSelector } from './store/box.selectors';
import { IAppState } from './store/box.state';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxComponent implements OnDestroy {
  loading$ = this._store.select(boxesLoadingSelector);
  boxes$ = this._store.select(boxesSelector);

  onDestroy$: ReplaySubject<void> = new ReplaySubject<void>();

  constructor(private _store: Store<IAppState>) {}

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
