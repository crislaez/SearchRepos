import { EntityStatus } from '@clrepos/shared/shared/utils/utils';
import { createReducer, on } from '@ngrx/store';
import * as CommentActions from '../actions/comment.actions';
import { Comment } from '../models';

export const commentFeatureKey = 'comment';

export interface State{
  status: EntityStatus;
  comment?: Comment[];
}

const initialState: State = {
  status: EntityStatus.Initial,
  comment:[],
  // page: 1,
  // total_pages: 1,
}

export const reducer = createReducer(
  initialState,
  on(CommentActions.loadComments, (state) => ({...state, status: EntityStatus.Pending })),
  on(CommentActions.saveComments, (state, { comment , status}) => ({...state, comment:[...state.comment, ...comment], status })),
  on(CommentActions.deleteComments, (state) => ({...state, comment:[], status: EntityStatus.Loaded })),


);


