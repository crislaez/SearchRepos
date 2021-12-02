import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCommentRepos from '../reducers/comment.reducer';

export const selectorReposState = createFeatureSelector<fromCommentRepos.State>(
  fromCommentRepos.commentFeatureKey
);


export const getComments = createSelector(
  selectorReposState,
  (state) => state.comment
);


export const getStatus = createSelector(
  selectorReposState,
  (state) => state.status
);

