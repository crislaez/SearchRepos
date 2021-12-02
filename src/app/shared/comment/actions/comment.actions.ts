import { createAction, props, union} from '@ngrx/store';
import { Comment } from '../models';
import { EntityStatus } from '@clrepos/shared/shared/utils/utils';

export const loadComments = createAction(
  '[Comment] Load Comments',
  props<{userName:string, repoName:string, issueNumber?:string, page?:string}>()
);

export const saveComments = createAction(
  '[Comment] Save Comments',
  props<{comment:Comment[], status: EntityStatus}>()
);

export const deleteComments = createAction(
  '[Comment] Delete Comments'
);

export const saveCommentsTotalPages = createAction(
  '[Comment] Save Comments total pages',
  props<{total_pages:number}>()
);

