import { cn } from '@/utils/style';
import Link from 'next/link';

interface AProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

export default function A({ href, className, ...props }: AProps): React.JSX.Element {
  const combinedClassName = cn('text-blue-500 underline', className);

  if (href && href.startsWith('http')) {
    return <a href={href} className={combinedClassName} {...props} target="blank" />;
  }

  if (href && href.startsWith('/notes#not-found')) {
    return (
      <span
        className={cn(combinedClassName, 'text-blue-500/60 cursor-not-allowed', className)}
        {...props}
      />
    );
  }

  return <Link href={href ?? '#'} className={combinedClassName} {...props} />;
}
