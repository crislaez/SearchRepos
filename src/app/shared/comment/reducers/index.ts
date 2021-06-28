import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromComment from './comment.reducer';

export const commentKey = 'comment';

export interface State {
  [commentKey]: fromComment.State
}

export const reducer = fromComment.reducer;

export const getCommentState = createFeatureSelector<State, fromComment.State>(commentKey);


export const getComments = createSelector(
  getCommentState,
  fromComment.getComments
);

export const getPending = createSelector(
  getCommentState,
  fromComment.getPending
);

// export const getPage = createSelector(
//   getCommentState,
//   fromComment.getPage
// );

// export const getTotalPages = createSelector(
//   getCommentState,
//   fromComment.getTotalPages
// );

// export const getIssue = (idIssue:string) => createSelector(
//   getIssues,
//   (issues) => {
//     return (issues || []).find(repo => repo?.id === Number(idIssue)) || {}
//   }
// );

