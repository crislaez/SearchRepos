import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRepos from './repos.reducer';

export const reposKey = 'repos';

export interface State {
  [reposKey]: fromRepos.State
}

export const reducer = fromRepos.reducer;

export const getReposState = createFeatureSelector<State, fromRepos.State>(reposKey);


export const getRepos = createSelector(
  getReposState,
  fromRepos.getRepos
);

export const getUserName = createSelector(
  getReposState,
  fromRepos.getUserName
);

export const getPending = createSelector(
  getReposState,
  fromRepos.getPending
);

export const getPage = createSelector(
  getReposState,
  fromRepos.getPage
);

export const getTotalPages = createSelector(
  getReposState,
  fromRepos.getTotalPages
);

export const getRepo = (idRepo:string) => createSelector(
  getRepos,
  (repos) => {
    return (repos || []).find(repo => repo?.id === Number(idRepo)) || {}
  }
);

