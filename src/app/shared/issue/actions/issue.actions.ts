import { EntityStatus } from '@clrepos/shared/utils/utils/functions';
import { createAction, props } from '@ngrx/store';
import { Issue } from '../models';

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

