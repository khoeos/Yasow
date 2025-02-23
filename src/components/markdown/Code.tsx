import { cn } from '@/utils/style';
import { JSX, type HTMLAttributes } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  children?: React.ReactNode;
}

export default function Code({ children, className, ...props }: CodeProps): JSX.Element {
  const match = /language-(\w+)/.exec(className || '');

  if (match) {
    return (
      <SyntaxHighlighter style={dracula} language={match[1]} PreTag="div">
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    );
  }

  return (
    <code className={cn('text-blue-500 underline', className)} {...props}>
      {children}
    </code>
  );
}
