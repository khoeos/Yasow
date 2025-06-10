import fs from 'fs/promises';
import path from 'path';

import { NoteSidebar } from '@/components/layout/NoteSidebar';

import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import NoteBreadcrumb from '@/components/layout/NoteBreadcrumb';
import { ModeToggle } from '@/components/ModeToggle';
import { TreeNode } from '@/types/types';
import { DISTANT_BASE_URL, FOLDER, SOURCE } from '@/config';
import { getFilesDistant } from '@/utils/data';

/**
 * Recursive function to build the folder/file tree.
 * @param dirPath - Absolute path to the folder to traverse.
 * @param basePath - Relative path (slug), used to generate slugs.
 * @returns Array of objects representing the tree.
 */
async function getTree(dirPath: string, basePath = ''): Promise<TreeNode[]> {
  // Asynchronous reading of directory entries
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  // Using Promise.all to handle asynchronous recursion
  const tree = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dirPath, entry.name);
      const entrySlug = '/notes/' + path.join(basePath, entry.name);

      const siteUrl = path.join('/notes', path.relative(FOLDER, entryPath));

      if (entry.isDirectory()) {
        // Recursively get children
        const children = await getTree(entryPath, entrySlug);

        return {
          name: entry.name,
          type: 'folder' as const,
          path: siteUrl,
          children,
        };
      } else {
        // File: no children
        return {
          name: entry.name.replace('.md', ''),
          type: 'file' as const,
          path: siteUrl.replace('.md', ''),
          children: [],
        };
      }
    })
  );

  // Sort folders first, then files
  return tree
    .sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === 'folder' ? -1 : 1;
    })
    .filter((item) => item.name[0] !== '.');
}

function buildTreeFromUrls(urls: string[]): TreeNode[] {
  const root: Record<string, TreeNode> = {};

  for (const url of urls) {
    const relative = url.split(DISTANT_BASE_URL)[1];
    if (!relative) continue;

    const parts = relative.split('/').filter(Boolean);
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i].replace('.md', '');
      const isFile = i === parts.length - 1;

      if (!current[part]) {
        current[part] = {
          name: part,
          type: isFile ? 'file' : 'folder',
          path:
            '/notes/' +
            parts
              .slice(0, i + 1)
              .join('/')
              .replace('.md', ''),
          children: [],
        };
      }

      if (!isFile) {
        // @ts-expect-error - dynamic nesting
        current = current[part].__children || (current[part].__children = {});
      }
    }
  }

  function flatten(nodeMap: Record<string, any>): TreeNode[] {
    return Object.values(nodeMap)
      .map((node: any) => {
        const children = node.__children ? flatten(node.__children) : [];
        delete node.__children;
        return { ...node, children };
      })
      .sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name);
        return a.type === 'folder' ? -1 : 1;
      });
  }

  return flatten(root);
}

export default async function NoteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tree =
    SOURCE === 'local'
      ? await getTree(FOLDER)
      : buildTreeFromUrls(await getFilesDistant());

  return (
    <SidebarProvider>
      <NoteSidebar tree={tree} />
      <SidebarInset className="h-screen flex flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <NoteBreadcrumb />
          <div className="flex-grow flex justify-end">
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 flex-grow overflow-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
