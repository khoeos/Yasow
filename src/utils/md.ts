import { TreeNode } from '@/types/types';

/**
 * Replace obsidian links [[]] with markdown links
 * @param content the markdown content
 * @param data Data from api/getData
 * @returns a markdown string with replaced links
 */
export const replaceObsidianLinks = (content: string, data: TreeNode[]): string => {
  return content.replace(/\[\[([\s\S]*?)\]\]/g, (_: string, inner: string) => {
    // Ignore empty links to avoid weird behavior
    if (!inner) {
      return '[[]]';
    }
    const splittedSlug = inner.split('|');
    const alias = splittedSlug[1] ?? splittedSlug[0];

    const href = `/notes${
      data.find((item: TreeNode) => item?.name && item.name === splittedSlug[0])?.path ??
      '#not-found'
    }`;
    return `[${alias}](${encodeURI(href)})`;
  });
};
