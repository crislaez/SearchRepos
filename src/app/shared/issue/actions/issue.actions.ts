import { createAction, props, union} from '@ngrx/store';
import { Issue } from '../models';
import { EntityStatus } from '@clrepos/shared/shared/utils/utils';

export const loadIssues = createAction(
  '[Issue] Load Issues',
  props<{userName:string, repoName:string, page?:string}>()
);

export const saveIssues = createAction(
  '[Issue] Save Issues',
  props<{repoName:string, issues:Issue[], page:number, total_pages:number, status: EntityStatus}>()
);

export const deleteIssues = createAction(
  '[Issue] Delete Issues'
);

