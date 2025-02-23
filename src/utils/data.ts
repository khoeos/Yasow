import fs from 'fs/promises';
import path from 'path';
import slugify from 'slugify';
import matter from 'gray-matter';

import { FOLDER, PAGE_VISIBILITY_RULES } from '@/config';
import { PageProperties, TagMap } from '@/types/types';

import { replaceObsidianLinks } from '@/utils/md';
import { extractTags } from '@/utils/tags';
/**
 * Get recursive list of markdown files in a directory
 * @param dir
 * @returns Array of file paths
 */
export const getFiles = async (dir: string): Promise<string[]> => {
  let results: string[] = [];
  const list = await fs.readdir(dir);

  await Promise.all(
    list.map(async (file) => {
      if (path.basename(file).startsWith('.') || path.basename(file).startsWith('__')) {
        return; // Skip hidden files
      }
      file = dir + '/' + file;
      const stat = await fs.stat(file);
      if (stat && stat.isDirectory()) {
        /* Recurse into a subdirectory */
        const subResults = await getFiles(file);
        results = results.concat(subResults);
      } else {
        /* Is a file */
        results.push(file);
      }
    }),
  );

  return results.filter((f) => f.endsWith('.md'));
};

/**
 * Check if a note is visible based on the visibility rules set in the config
 * @param pageProperties the data extracted with gray-matter from the markdown file
 * @returns
 */
export const isNoteVisible = (pageProperties: PageProperties): boolean => {
  return Object.values(PAGE_VISIBILITY_RULES).every((rule) => {
    const propertyValue = pageProperties[rule.property];
    return (
      propertyValue === undefined ||
      propertyValue === null ||
      rule.isVisible(propertyValue as boolean)
    );
  });
};

/**
 * Construct the base object needed in various functions
 * from the markdown files in the notes directory :
 * - Array of the notes with needed properties
 * - List of tags with references to the notes
 */
export const constructGraphData = async (): Promise<{
  notes: PageProperties[];
  tags: TagMap;
}> => {
  const filePaths = await getFiles(FOLDER);
  const tagMap: TagMap = {};
  const nodes = filePaths.map(async (filePath) => {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const visible = isNoteVisible(data);
    if (!visible) {
      return null;
    }
    const path = filePath.replace(FOLDER, '').replace('.md', '');
    const aliases = data.aliases ?? [];
    const splitted = path.split('/');
    const id =
      'id-' +
      slugify(splitted.join('-'), {
        lower: true,
        strict: true,
        trim: true,
      });
    const name = splitted[splitted.length - 1];

    const tags = extractTags(content);
    tags.forEach((tag) => {
      if (!tagMap[tag]) {
        tagMap[tag] = [];
      }
      tagMap[tag].push({ name, path });
    });

    return {
      id,
      name,
      aliases,
      data,
      content,
      path: path,
      type: 'file' as const,
      children: [],
    };
  });
  const nodesData = await Promise.all(nodes);

  const filteredNodesData = nodesData.filter(
    (node): node is NonNullable<typeof node> => node !== null,
  );
  const parsedNodes = filteredNodesData.map((node) => {
    return {
      ...node,
      content: replaceObsidianLinks(node.content, filteredNodesData),
    };
  });

  const sortedtags = Object.entries(tagMap)
    .sort(([tagA, a], [tagB, b]) => {
      const lengthDiff = b.length - a.length;
      return lengthDiff !== 0 ? lengthDiff : tagA.localeCompare(tagB);
    })
    .reduce(
      (acc, [tag, references]) => ({
        ...acc,
        [tag]: references,
      }),
      {} as TagMap,
    );

  return { notes: parsedNodes, tags: sortedtags };
};
