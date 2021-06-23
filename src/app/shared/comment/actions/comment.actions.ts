import { createAction, props, union} from '@ngrx/store';
import { Comment } from '../models';

export const loadComments = createAction('[Comment] Load Comments', props<{userName:string, repoName:string, issueNumber?:string, page?:string}>());
export const saveComments = createAction('[Comment] Save Comments', props<{comment:Comment[], page:number, total_pages:number}>());
export const deleteComments = createAction('[Comment] Delete Comments');


const all = union({
  loadComments,
  saveComments,
  deleteComments
})

export type CommentsActionsUnion = typeof all;


