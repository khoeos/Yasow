import A from '@/components/markdown/A';
import Code from '@/components/markdown/Code';
import { createTitleComponent } from '@/components/markdown/Titles';
import { Components } from 'react-markdown';

const componentsParams: Components = {
  h1: createTitleComponent('h2'),
  h2: createTitleComponent('h3'),
  h3: createTitleComponent('h4'),
  h4: createTitleComponent('h5'),
  h5: createTitleComponent('h6'),
  h6: createTitleComponent('h6'),
  a: A,
  code: Code,
};

export default componentsParams;
