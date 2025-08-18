import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProductsService} from '../services/products.service';
import * as ProductsActions from './products.actions';
import {mergeMap, map, catchError, of} from 'rxjs';

@Injectable()
export class ProductsEffects {
  loadProducts$
  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {
    this.loadProducts$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ProductsActions.loadProducts),
        mergeMap(() =>
          this.productsService.loadAll().pipe(
            map(products => ProductsActions.loadProductsSuccess({ products })),
            catchError(error => of(ProductsActions.loadProductsFailure({ error })))
          )
        )
      )
    );
  }
}
