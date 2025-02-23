import path from 'path';

export const LANGUAGE = 'en';

export const FOLDER = path.join(process.cwd(), 'src', 'notes');

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const PAGE_VISIBILITY_RULES = {
  draft: {
    property: 'draft',
    isVisible: (value: boolean): boolean => !value,
  },
  published: {
    property: 'published',
    isVisible: (value: boolean): boolean => value,
  },
  private: {
    property: 'private',
    isVisible: (value: boolean): boolean => !value,
  },
};
