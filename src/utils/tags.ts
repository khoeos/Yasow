/**
 * Extract tags from Markdown content
 * Words starting with #
 * Without space and special characters
 * @param content Markdown content
 * @returns Array of tags
 */
export const extractTags = (content: string): string[] => {
  const tagRegex = /#[^\s,.:;!#?()[\]{}"']+/g;
  const matches = content.match(tagRegex) || [];
  return [...new Set(matches)]; // Remove duplicates
};
