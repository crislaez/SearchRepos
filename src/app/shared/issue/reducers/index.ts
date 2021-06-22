import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromIssue from './issue.reducer';

export const issueKey = 'issues';

export interface State {
  [issueKey]: fromIssue.State
}

export const reducer = fromIssue.reducer;

export const getIssueState = createFeatureSelector<State, fromIssue.State>(issueKey);


export const getIssues = createSelector(
  getIssueState,
  fromIssue.getIssues
);

export const getPending = createSelector(
  getIssueState,
  fromIssue.getPending
);

export const getPage = createSelector(
  getIssueState,
  fromIssue.getPage
);

export const getTotalPages = createSelector(
  getIssueState,
  fromIssue.getTotalPages
);

export const getIssue = (idIssue:string) => createSelector(
  getIssues,
  (issues) => {
    return (issues || []).find(repo => repo?.id === Number(idIssue)) || {}
  }
);

