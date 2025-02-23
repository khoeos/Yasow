import * as React from 'react';
import { ChevronRight, File, Folder, Tag } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { TreeNode } from '@/types/types';

interface NoteSidebarProps extends React.ComponentProps<typeof Sidebar> {
  tree: TreeNode[];
}

export function NoteSidebar({ tree, ...props }: NoteSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={'/notes/tags'} passHref>
                    <Tag />
                    Tags
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Notes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tree.map((item, index) => (
                <Tree key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

function Tree({ item }: { item: TreeNode }) {
  // const [name, ...items] = Array.isArray(item) ? item : [item];
  const { name, children, path, type } = item;

  if (type === 'file') {
    return (
      <SidebarMenuButton
        isActive={name === 'button.tsx'}
        className="data-[active=true]:bg-transparent"
        asChild
      >
        <Link href={path} passHref>
          <File />
          {name}
        </Link>
      </SidebarMenuButton>
    );
  }

  if (type === 'folder' && children.length === 0) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton className="ml-6">
          <Folder />
          {name}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen={name === 'components' || name === 'ui'}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className="transition-transform" />
            <Folder />
            {name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {children && children.map((subItem, index) => <Tree key={index} item={subItem} />)}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
