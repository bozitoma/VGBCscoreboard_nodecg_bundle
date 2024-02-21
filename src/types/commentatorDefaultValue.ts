export interface CommentatorValue {
  name: string;
  account: string;
  tag: string;
}

export const commentatorDefaultValue: CommentatorValue = {
  name: '',
  account: '',
  tag: '',
};

export type CommentatorText = 'commentator1' | 'commentator2' | 'commentator3' | 'commentator4';

export interface CommentatorInfo {
  commentator1: CommentatorValue;
  commentator2: CommentatorValue;
  commentator3: CommentatorValue;
  commentator4: CommentatorValue;
}
