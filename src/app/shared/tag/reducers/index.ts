import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTag from './tag.reducer';

export const tagKey = 'tag';

export interface State {
  [tagKey]: fromTag.State
}

export const reducer = fromTag.reducer;

export const getTagState = createFeatureSelector<State, fromTag.State>(tagKey);


export const getTags = createSelector(
  getTagState,
  fromTag.getTags
);

// export const getRepoName = createSelector(
//   getTagState,
//   fromTag.getRepoName
// );

export const getPending = createSelector(
  getTagState,
  fromTag.getPending
);

export const getPage = createSelector(
  getTagState,
  fromTag.getPage
);

export const getTotalPages = createSelector(
  getTagState,
  fromTag.getTotalPages
);

// export const getIssue = (idIssue:string) => createSelector(
//   getIssues,
//   (issues) => {
//     return (issues || []).find(repo => repo?.id === Number(idIssue)) || {}
//   }
// );

