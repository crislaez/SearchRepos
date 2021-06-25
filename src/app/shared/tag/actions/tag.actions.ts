import { createAction, props, union} from '@ngrx/store';
import { Tag } from '../models';

export const loadTags = createAction('[Tag] Load Tags', props<{userName:string, repoName:string, page?:string}>());
export const saveTags = createAction('[Tag] Save Tags', props<{repoName:string, tags:Tag[], page:number, total_pages:number}>());
export const deleteTags = createAction('[Tag] Delete Tags');


const all = union({
  loadTags,
  saveTags,
  deleteTags
})

export type TagsActionsUnion = typeof all;
