import { createReducer, on  } from '@ngrx/store';
import { CommentActions } from '../actions';
import { Comment } from '../models';

// interface Status {
//   pending?: boolean;
//   error?: string;
// }

export interface State{
  comment?: Comment[];
  pending?: boolean;
  // page?: number;
  // total_pages?: number;
}

const initialState: State = {
  comment:[],
  pending: false,
  // page: 1,
  // total_pages: 1,
}

const issueReducer = createReducer(
  initialState,
  on(CommentActions.loadComments, (state) => ({...state, pending: true})),
  on(CommentActions.saveComments, (state, { comment }) => ({...state, comment:[...state.comment, ...comment], pending: false })),
  on(CommentActions.deleteComments, (state) => ({...state, comment:[], pending: false })),
  // on(CommentActions.deleteComments, (state) => ({...state, comment:[], page:1, total_pages:1, pending: false })),

  // on(CommentActions.saveCommentsTotalPages, (state, {total_pages}) => ({...state, total_pages }))

);

export function reducer(state: State | undefined, action: CommentActions.CommentsActionsUnion){
  return issueReducer(state, action);
}

export const getComments = (state: State) => state?.comment;
export const getPending = (state: State) => state?.pending;
// export const getPage = (state: State) => state?.page;
// export const getTotalPages = (state: State) => state?.total_pages;

