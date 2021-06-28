import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSubscriber from './subscriber.reducer';

export const subscriberKey = 'subscriber';

export interface State {
  [subscriberKey]: fromSubscriber.State
}

export const reducer = fromSubscriber.reducer;

export const getSubscriberState = createFeatureSelector<State, fromSubscriber.State>(subscriberKey);


export const getSubscribers = createSelector(
  getSubscriberState,
  fromSubscriber.getSubscribers
);

// export const getRepoName = createSelector(
//   getSubscriberState,
//   fromSubscriber.getRepoName
// );

export const getPending = createSelector(
  getSubscriberState,
  fromSubscriber.getPending
);

export const getPage = createSelector(
  getSubscriberState,
  fromSubscriber.getPage
);

export const getTotalPages = createSelector(
  getSubscriberState,
  fromSubscriber.getTotalPages
);

// export const getIssue = (idIssue:string) => createSelector(
//   getIssues,
//   (issues) => {
//     return (issues || []).find(repo => repo?.id === Number(idIssue)) || {}
//   }
// );

