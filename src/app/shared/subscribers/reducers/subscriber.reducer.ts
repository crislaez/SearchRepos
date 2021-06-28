import { createReducer, on  } from '@ngrx/store';
import { SubscriberActions } from '../actions';
import { Subscriber } from '../models';

// interface Status {
//   pending?: boolean;
//   error?: string;
// }

export interface State{
  subscribers?: Subscriber[];
  repoName?:string;
  pending?: boolean;
  page?: number;
  total_pages?: number;
}

const initialState: State = {
  subscribers:[],
  repoName:'',
  pending: false,
  page: 1,
  total_pages: 1,
}

const SubscriberReducer = createReducer(
  initialState,
  on(SubscriberActions.loadSubscribers, (state) => ({...state, pending: true})),
  on(SubscriberActions.saveSubscribers, (state, { repoName, subscribers, page, total_pages }) => ({...state, repoName, subscribers:[...state.subscribers, ...subscribers], page, total_pages, pending: false })),
  on(SubscriberActions.deleteSubscribers, (state) => ({...state, subscribers:[], page:1, total_pages:1, repoName:'', pending: false })),

);

export function reducer(state: State | undefined, action: SubscriberActions.SubscribersActionsUnion){
  return SubscriberReducer(state, action);
}

export const getSubscribers = (state: State) => state?.subscribers;
export const getRepoName= (state: State) => state?.repoName;
export const getPending = (state: State) => state?.pending;
export const getPage = (state: State) => state?.page;
export const getTotalPages = (state: State) => state?.total_pages;

