import { createReducer, on  } from '@ngrx/store';
import { IssueActions } from '../actions';
import { Issue } from '../models';

// interface Status {
//   pending?: boolean;
//   error?: string;
// }

export interface State{
  issues?: Issue[];
  repoName?:string;
  pending?: boolean;
  page?: number;
  total_pages?: number;
}

const initialState: State = {
  issues:[],
  repoName:'',
  pending: false,
  page: 1,
  total_pages: 1,
}

const issueReducer = createReducer(
  initialState,
  on(IssueActions.loadIssues, (state) => ({...state, pending: true})),
  on(IssueActions.saveIssues, (state, { repoName, issues, page, total_pages }) => ({...state, repoName, issues:[...state.issues, ...issues], page, total_pages, pending: false })),
  on(IssueActions.deleteIssues, (state) => ({...state, issues:[], page:1, total_pages:1, pending: false })),

);

export function reducer(state: State | undefined, action: IssueActions.IssuesActionsUnion){
  return issueReducer(state, action);
}

export const getIssues = (state: State) => state?.issues;
export const getRepoName= (state: State) => state?.repoName;
export const getPending = (state: State) => state?.pending;
export const getPage = (state: State) => state?.page;
export const getTotalPages = (state: State) => state?.total_pages;

