import { EntityStatus } from '@clrepos/shared/shared/utils/utils';
import { createAction, props, union} from '@ngrx/store';
import { Subscriber } from '../models';

export const loadSubscribers = createAction(
  '[Subscriber] Load Subscribers',
  props<{userName:string, repoName:string, page?:string}>()
);

export const saveSubscribers = createAction(
  '[Subscriber] Save Subscribers',
  props<{repoName:string, subscribers:Subscriber[], page:number, total_pages:number, status: EntityStatus}>()
);

export const deleteSubscribers = createAction(
  '[Subscriber] Delete Subscribers'
);
