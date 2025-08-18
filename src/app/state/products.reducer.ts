import {Product} from '../models/product.model';
import {createReducer, on} from '@ngrx/store';
import * as ProductsActions from './products.actions';

export interface ProductsState {
  items: Product[],
  error: string,
  isLoadingItems: boolean
}

export const initialState: ProductsState = {items: [], error: '', isLoadingItems: false}
export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, (state: any) => ({
    ...state,
    isLoadingItems: true
  })),
  on(ProductsActions.loadProductsSuccess, (state,{products}) => ({
    ...state,
    isLoadingItems: false,
    items: products
  })),
  on(ProductsActions.loadProductsFailure, (state,{error}) => ({
    ...state,
    isLoadingItems: false,
    error
  }))
  )
