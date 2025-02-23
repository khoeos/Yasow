import Link from 'next/link';
import { List } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { JSX } from 'react';

interface Header {
  text: string;
  slug: string;
  level: 1 | 2 | 3 | 4;
  children: Header[];
}

type LevelStyles = {
  readonly [K in 'link' | 'container']: {
    readonly [L in Header['level']]: string;
  };
};

const LEVEL_STYLES: LevelStyles = {
  link: {
    1: 'font-bold text-black dark:text-white',
    2: 'font-bold text-black dark:text-white',
    3: 'text-gray-900 dark:text-gray-100',
    4: 'text-gray-7800 dark:text-gray-200',
  },
  container: {
    1: 'mb-2',
    2: 'mb-2',
    3: 'mb-1',
    4: 'mb-1',
  },
} as const;

interface TocProps {
  content: string;
}

interface TocItemProps {
  item: Header;
}

const extractHeaders = (markdown: string): Header[] => {
  const headerRegex = /^#{1,6}\s(.+)/gm;

  const matches = Array.from(markdown.matchAll(headerRegex));

  return matches.map((match) => {
    const text = match[1];
    const level = Math.min(match[0].match(/^#+/)?.[0]?.length ?? 1, 4) as Header['level'];

    return {
      text,
      slug: text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-'),
      level,
      children: [],
    };
  });
};

const createTree = (items: Header[]): Header[] => {
  const root: Header[] = [];
  const stack: Header[] = [];

  items.forEach((item) => {
    while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(item);
    } else {
      stack[stack.length - 1].children.push(item);
    }

    stack.push(item);
  });

  return root;
};

const TocItem = ({ item }: TocItemProps): JSX.Element => (
  <li className={LEVEL_STYLES.container[item.level]}>
    <Link className={`${LEVEL_STYLES.link[item.level]} w-full block`} href={`#${item.slug}`}>
      {item.text}
    </Link>
    {item.children.length > 0 && (
      <ul className="ml-4">
        {item.children.map((child) => (
          <TocItem key={child.slug} item={child} />
        ))}
      </ul>
    )}
  </li>
);

export default function Toc({ content }: TocProps): JSX.Element | null {
  const tree = createTree(extractHeaders(content));

  if (tree.length === 0) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="fixed right-4 top-24">
          <List />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-[70vh] overflow-y-auto overflow-x-hidden">
        <nav className="w-64 text-sm">
          <h2 className="font-semibold mb-2 text-slate-800 italic">Table of Contents</h2>
          <ul className="text-slate-800">
            {tree.map((header) => (
              <TocItem key={header.slug} item={header} />
            ))}
          </ul>
        </nav>
      </PopoverContent>
    </Popover>
  );
}
