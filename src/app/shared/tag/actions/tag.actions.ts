import { EntityStatus } from '@clrepos/shared/shared/utils/utils';
import { createAction, props } from '@ngrx/store';
import { Tag } from '../models';

export const loadTags = createAction(
  '[Tag] Load Tags',
  props<{userName:string, repoName:string, page?:string}>()
);

export const saveTags = createAction(
  '[Tag] Save Tags',
  props<{repoName:string, tags:Tag[], page:number, total_pages:number, status: EntityStatus}>()
);

export const deleteTags = createAction(
  '[Tag] Delete Tags'
);


