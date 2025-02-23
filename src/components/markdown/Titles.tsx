import { cn } from '@/utils/style';
import { ReactNode } from 'react';

const getId = (text: string) => text.toLowerCase().replace(/\s+/g, '-');

const getTextFromChildren = (children: ReactNode): string => {
  if (typeof children === 'string') {
    return children;
  }
  if (Array.isArray(children)) {
    return children.map((child) => getTextFromChildren(child)).join('');
  }
  if (typeof children === 'number') {
    return children.toString();
  }
  return '';
};

export const createTitleComponent = (
  Tag: 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  className?: string,
  id?: string,
) => {
  return function TitleComponent({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    const generatedId = id || getId(getTextFromChildren(props.children));
    return <Tag id={generatedId} className={cn('font-bold mb-4 mt-2', className)} {...props} />;
  };
};
