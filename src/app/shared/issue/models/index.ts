export interface Issue{
  url?: string;
  repository_url?: string;
  labels_url?: string;
  comments_url?: string;
  events_url?: string;
  html_url?: string;
  id?: number;
  node_id?: string;
  number?: number;
  title?: string;
  user?: any;
  labels?: any[];
  state?: string;
  locked?: boolean;
  assignee?: any;
  assignees?: any;
  milestone?: any;
  comments?: number;
  created_at?: string;
  updated_at?: string;
  closed_at?: any;
  author_association?: string;
  active_lock_reason?: any;
  pull_request?: any;
  body?: string;
  performed_via_github_app?: any;
}
