By default, all page are visible except those starting with a dot or double underscore.

You also can pass properties to your markdow file to change this behavior.

```markdown
---
draft: true
published: false
private: true
---
```

You can have one property, or all of them, or none of them.

- If one of them is set to the value above, the page will be hidden.
- If none of them are set, the page will be visible.

You can configure the behavior and the properties in the "config.ts" file :

```ts
export const PAGE_VISIBILITY_RULES = {
  draft: {
    property: 'draft',
    isVisible: (value: boolean) => !value,
  },
  published: {
    property: 'published',
    isVisible: (value: boolean) => value,
  },
  private: {
    property: 'private',
    isVisible: (value: boolean) => !value,
  },
};
```
