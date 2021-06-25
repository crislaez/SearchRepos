import { createReducer, on  } from '@ngrx/store';
import { TagActions } from '../actions';
import { Tag } from '../models';

// interface Status {
//   pending?: boolean;
//   error?: string;
// }

export interface State{
  tags?: Tag[];
  // repoName?:string;
  pending?: boolean;
  page?: number;
  total_pages?: number;
}

const initialState: State = {
  tags:[],
  // repoName:'',
  pending: false,
  page: 1,
  total_pages: 1,
}

const tagReducer = createReducer(
  initialState,
  on(TagActions.loadTags, (state) => ({...state, pending: true})),
  on(TagActions.saveTags, (state, { repoName, tags, page, total_pages }) => ({...state, repoName, tags:[...state.tags, ...tags], page, total_pages, pending: false })),
  on(TagActions.deleteTags, (state) => ({...state, tags:[], page:1, total_pages:1, repoName:'', pending: false })),

);

export function reducer(state: State | undefined, action: TagActions.TagsActionsUnion){
  return tagReducer(state, action);
}

export const getTags = (state: State) => state?.tags;
// export const getRepoName= (state: State) => state?.repoName;
export const getPending = (state: State) => state?.pending;
export const getPage = (state: State) => state?.page;
export const getTotalPages = (state: State) => state?.total_pages;

