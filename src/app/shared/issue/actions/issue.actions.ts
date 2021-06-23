import { createAction, props, union} from '@ngrx/store';
import { Issue } from '../models';

export const loadIssues = createAction('[Issue] Load Issues', props<{userName:string, repoName:string, page?:string}>());
export const saveIssues = createAction('[Issue] Save Issues', props<{repoName:string, issues:Issue[], page:number, total_pages:number}>());
export const deleteIssues = createAction('[Issue] Delete Issues');


const all = union({
  loadIssues,
  saveIssues,
  deleteIssues
})

export type IssuesActionsUnion = typeof all;
