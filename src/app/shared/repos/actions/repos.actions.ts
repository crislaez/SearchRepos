import { EntityStatus } from '@clrepos/shared/utils/utils/functions';
import { createAction, props } from '@ngrx/store';
import { Repo } from '../models';

export const loadRepos = createAction(
  '[Repo] Load repos',
  props<{name:string, page?:string}>()
);

export const saveRepos = createAction(
  '[Repo] Save repos',
  props<{usserName:string, repos:Repo[], page:number, total_pages:number, status: EntityStatus}>()
);

export const deleteRepos = createAction(
  '[Repo] Delete repos'
);
