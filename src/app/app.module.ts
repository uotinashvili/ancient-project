import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { GraphQLModule } from './shared/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { reducers } from './shared/store/reducers';
import { SharedModule } from './shared/shared.module';
import { BoxComponent } from './box/box.component';
import { BoxDetailComponent } from './box/components/box-detail/box-detail.component';
import { BoxItemComponent } from './box/components/box-item/box-item.component';
import { BoxEffects } from './box/store/box.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent, BoxComponent, BoxItemComponent, BoxDetailComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GraphQLModule,
    SharedModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    EffectsModule.forRoot([BoxEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
