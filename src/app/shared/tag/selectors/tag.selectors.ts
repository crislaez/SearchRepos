import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTag from '../reducers/tag.reducer';

export const selectorTagState = createFeatureSelector<fromTag.State>(
  fromTag.tagFeatureKey
);

export const getTags = createSelector(
  selectorTagState,
  (state) => state.tags
);

export const getStatus = createSelector(
  selectorTagState,
  (state) => state.status
);

export const getPage = createSelector(
  selectorTagState,
  (state) => state.page
);

export const getTotalPages = createSelector(
  selectorTagState,
  (state) => state.total_pages
);

