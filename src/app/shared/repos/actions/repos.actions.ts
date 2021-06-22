import { createAction, props, union} from '@ngrx/store';
import { Repo } from '../models';

export const loadRepos = createAction('[Repo] Load repos', props<{name:string, page?:string}>());
export const saveRepos = createAction('[Repo] Save repos', props<{usserName:string, repos:Repo[], page:number, total_pages:number}>());
export const deleteRepos = createAction('[Repo] Delete repos');


const all = union({
  loadRepos,
  saveRepos,
  deleteRepos
})

export type ReposActionsUnion = typeof all;
