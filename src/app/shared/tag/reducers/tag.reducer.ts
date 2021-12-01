import { createReducer, on  } from '@ngrx/store';
import * as TagActions from '../actions/tag.actions';
import { Tag } from '../models';
import { EntityStatus } from '@clrepos/shared/shared/utils/utils';


export const tagFeatureKey = 'tag';
export interface State{
  tags?: Tag[];
  status: EntityStatus;
  page?: number;
  total_pages?: number;
}

const initialState: State = {
  status: EntityStatus.Initial,
  tags:[],
  page: 1,
  total_pages: 1,
}

export const reducer = createReducer(
  initialState,
  on(TagActions.loadTags, (state) => ({...state, status: EntityStatus.Pending })),
  on(TagActions.saveTags, (state, { repoName, tags, page, total_pages, status }) => ({...state, repoName, tags:[...state.tags, ...tags], page, total_pages, status })),
  on(TagActions.deleteTags, (state) => ({...state, tags:[], page:1, total_pages:1, repoName:'', status: EntityStatus.Loaded })),

);


