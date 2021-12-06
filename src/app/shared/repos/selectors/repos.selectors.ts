import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRepos from '../reducers/repos.reducer';

export const selectorReposState = createFeatureSelector<fromRepos.State>(
  fromRepos.reposFeatureKey
);

export const getRepos = createSelector(
  selectorReposState,
  (state) => state.repos
);

export const getUserName = createSelector(
  selectorReposState,
  (state) => state?.usserName
);

export const getStatus = createSelector(
  selectorReposState,
  (state) => state.status
);

export const getPage = createSelector(
  selectorReposState,
  (state) => state.page
);

export const getTotalPages = createSelector(
  selectorReposState,
  (state) => state.total_pages
);

export const getRepo = (idRepo:string) => createSelector(
  getRepos,
  (repos) => {
    return (repos || []).find(repo => repo?.id === Number(idRepo)) || {}
  }
);
