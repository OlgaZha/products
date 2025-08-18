import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProductsState} from './products.reducer';

export const selectProductsState = createFeatureSelector<ProductsState>('products');
export const selectAllProducts = createSelector(selectProductsState, (state) => state.items);
export const selectIsProductsLoading = createSelector(selectProductsState, (state) => state.isLoadingItems);
