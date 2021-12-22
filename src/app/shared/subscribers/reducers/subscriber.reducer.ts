import { EntityStatus } from '@clrepos/shared/utils/utils/functions';
import { createReducer, on } from '@ngrx/store';
import * as SubscriberActions from '../actions/subscriber.actions';
import { Subscriber } from '../models';

export const subscriberFeatureKey = 'subscriber';
export interface State{
  subscribers?: Subscriber[];
  repoName?:string;
  status: EntityStatus;
  page?: number;
  total_pages?: number;
}

const initialState: State = {
  subscribers:[],
  repoName:'',
  status: EntityStatus.Initial,
  page: 1,
  total_pages: 1,
}

export const reducer = createReducer(
  initialState,
  on(SubscriberActions.loadSubscribers, (state) => ({...state, status: EntityStatus.Pending})),
  on(SubscriberActions.saveSubscribers, (state, { repoName, subscribers, page, total_pages, status }) => ({...state, repoName, subscribers:[...state.subscribers, ...subscribers], page, total_pages, status })),
  on(SubscriberActions.deleteSubscribers, (state) => ({...state, subscribers:[], page:1, total_pages:1, repoName:'', status: EntityStatus.Loaded})),

);
