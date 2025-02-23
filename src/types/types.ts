export type PageProperties = {
  draft?: boolean;
  published?: boolean;
  private?: boolean;
  [key: string]: unknown;
};

export interface TreeNode {
  name: string;
  type: 'folder' | 'file';
  path: string;
  children: TreeNode[];
}

export type NoteReference = {
  name: string;
  path: string;
};

export type TagMap = {
  [key: string]: NoteReference[];
};
