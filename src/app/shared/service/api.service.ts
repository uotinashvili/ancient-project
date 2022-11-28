import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, Observable } from 'rxjs';
import { IBox, IUser, IBoxOpening, IOpenBoxInput } from 'src/app/box/model/box.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _apollo: Apollo) {}

  loadBoxes(): Observable<IBox[]> {
    return this._apollo
      .query<any>({
        query: gql`
          query {
            boxes(free: false, purchasable: true, openable: true) {
              edges {
                node {
                  id
                  name
                  iconUrl
                  cost
                }
              }
            }
          }
        `,
      })
      .pipe(
        map((data) => {
          const edges = data.data.boxes.edges;

          return edges.map((edge: any) => ({
            id: edge?.node?.id,
            name: edge?.node?.name,
            iconUrl: edge?.node?.iconUrl,
            cost: edge?.node?.cost,
          })) as IBox[];
        })
      );
  }

  openBox(input: IOpenBoxInput): Observable<IBoxOpening[]> {
    const OPEN_BOX = gql`
      mutation OpenBox($input: OpenBoxInput!) {
        openBox(input: $input) {
          boxOpenings {
            id
            itemVariant {
              id
              name
              value
            }
          }
        }
      }
    `;

    return this._apollo
      .mutate({
        mutation: OPEN_BOX,
        variables: {
          input,
        },
      })
      .pipe(map((response: any) => response.data.openBox.boxOpenings as IBoxOpening[]));
  }

  getCurrentUser(): Observable<IUser> {
    return this._apollo
      .query<any>({
        query: gql`
          query {
            currentUser {
              id
              name
              wallets {
                id
                amount
                currency
              }
            }
          }
        `,
      })
      .pipe(map((response: any) => response.data.currentUser as IUser));
  }

  onUpdateWallet(): Observable<any> {
    return this._apollo.subscribe({
      query: gql`
        subscription OnUpdateWallet {
          updateWallet {
            wallet {
              id
              amount
              name
            }
          }
        }
      `,
    });
  }
}
