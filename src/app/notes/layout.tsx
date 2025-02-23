import fs from 'fs/promises';
import path from 'path';

import { NoteSidebar } from '@/components/layout/NoteSidebar';

import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import NoteBreadcrumb from '@/components/layout/NoteBreadcrumb';
import { ModeToggle } from '@/components/ModeToggle';
import { TreeNode } from '@/types/types';

const FOLDER = path.join(process.cwd(), 'src', 'notes');

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
    }),
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

export default async function NoteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tree = await getTree(FOLDER);

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
