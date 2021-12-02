import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromIssue from '../reducers/issue.reducer';

export const selectorIssueState = createFeatureSelector<fromIssue.State>(
  fromIssue.issueFeatureKey
);

export const getIssues = createSelector(
  selectorIssueState,
  (state) => state.issues
);

export const getRepoName = createSelector(
  selectorIssueState,
  (state) => state.repoName
);

export const getStatus = createSelector(
  selectorIssueState,
  (state) => state.status
);

export const getPage = createSelector(
  selectorIssueState,
  (state) => state.page
);

export const getTotalPages = createSelector(
  selectorIssueState,
  (state) => state.total_pages
);

