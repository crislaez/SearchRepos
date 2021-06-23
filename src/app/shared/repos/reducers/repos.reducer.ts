import { createReducer, on  } from '@ngrx/store';
import { ReposActions } from '../actions';
import { Repo } from '../models';

// interface Status {
//   pending?: boolean;
//   error?: string;
// }

export interface State{
  repos?: Repo[];
  usserName?:string;
  pending?: boolean;
  page?: number;
  total_pages?: number;
}

const initialState: State = {
  repos:[],
  usserName:'',
  pending: false,
  page: 1,
  total_pages: 1,
}

const reposReducer = createReducer(
  initialState,
  on(ReposActions.loadRepos, (state) => ({...state, pending: true})),
  on(ReposActions.saveRepos, (state, { usserName, repos, page, total_pages }) => ({...state, usserName, repos:[...state.repos, ...repos], page, total_pages, pending: false })),
  on(ReposActions.deleteRepos, (state) => ({...state, repos:[], page:1, total_pages:1, pending: false })),

);

export function reducer(state: State | undefined, action: ReposActions.ReposActionsUnion){
  return reposReducer(state, action);
}

export const getRepos = (state: State) => state?.repos;
export const getUserName = (state: State) => state?.usserName;
export const getPending = (state: State) => state?.pending;
export const getPage = (state: State) => state?.page;
export const getTotalPages = (state: State) => state?.total_pages;

