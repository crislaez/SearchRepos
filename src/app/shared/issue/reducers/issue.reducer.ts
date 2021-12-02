import { createReducer, on  } from '@ngrx/store';
import * as IssueActions from '../actions/issue.actions';
import { Issue } from '../models';
import { EntityStatus } from '@clrepos/shared/shared/utils/utils';

export const issueFeatureKey = 'issues';

export interface State{
  issues?: Issue[];
  repoName?:string;
  status: EntityStatus;
  page?: number;
  total_pages?: number;
}

const initialState: State = {
  status: EntityStatus.Initial,
  issues:[],
  repoName:'',
  page: 1,
  total_pages: 1,
}

export const reducer = createReducer(
  initialState,
  on(IssueActions.loadIssues, (state) => ({...state, status: EntityStatus.Pending})),
  on(IssueActions.saveIssues, (state, { repoName, issues, page, total_pages, status }) => ({...state, repoName, issues:[...state.issues, ...issues], page, total_pages, status })),
  on(IssueActions.deleteIssues, (state) => ({...state, issues:[], page:1, total_pages:1, repoName:'', status: EntityStatus.Loaded })),

);
