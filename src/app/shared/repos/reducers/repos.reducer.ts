import { EntityStatus } from '@clrepos/shared/utils/utils/functions';
import { createReducer, on } from '@ngrx/store';
import * as ReposActions from '../actions/repos.actions';
import { Repo } from '../models';

export const reposFeatureKey = 'repos';

export interface State{
  status: EntityStatus;
  repos?: Repo[];
  usserName?:string;
  page?: number;
  total_pages?: number;
}

const initialState: State = {
  status: EntityStatus.Initial,
  repos:[],
  usserName:'',
  page: 1,
  total_pages: 1,
}

export const reducer = createReducer(
  initialState,
  on(ReposActions.loadRepos, (state) => ({...state, status: EntityStatus.Pending })),
  on(ReposActions.saveRepos, (state, { usserName, repos, page, total_pages, status }) => {
    const reducersRepos = [...state.repos]
    let ids = reducersRepos?.map(({id}) => id)
    let result = [...reducersRepos, ...(repos || []).filter(item => !ids.includes(item?.id))]
    return {...state,
      usserName,
      repos:[...result],
      page,
      total_pages,
      status
    }
  }),
  on(ReposActions.deleteRepos, (state) => ({...state, repos:[], page:1, total_pages:1, usserName:'', status: EntityStatus.Loaded }) ),

);

