import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSubscriber from '../reducers/subscriber.reducer';

export const selectorsSubscriber = createFeatureSelector<fromSubscriber.State>(
  fromSubscriber.subscriberFeatureKey
);

export const getSubscribers = createSelector(
  selectorsSubscriber,
  (state) => state.subscribers
);

export const getRepoName = createSelector(
  selectorsSubscriber,
  (state) => state.repoName
);

export const getStatus = createSelector(
  selectorsSubscriber,
  (state) => state.status
);

export const getPage = createSelector(
  selectorsSubscriber,
  (state) => state.page
);

export const getTotalPages = createSelector(
  selectorsSubscriber,
  (state) => state.total_pages
);

