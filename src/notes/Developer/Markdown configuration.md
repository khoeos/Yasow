Markdown files are parsed using react-markdown in `notes/[...slug]/page.tsx`

Every markdown's tag name is converted into html, and the component used est 100% customizable using a constant in `src/components/markdown/index.tsx`

Each html tag is replaced with the react component if defined in the constant.

So you can create custom component, customize or replace the existing one.

I have pre-made some components because of some interaction nedded with the app.

## Links
I had to customize the link behavior to handle the navigation in the app using obsidian's linking system and implement the use of next/link for in app navigation.

## Code
I wanted to add syntax highlighting to the code, so i've added a custom component for it.
I use react-syntax-highlighter for this, so you can customize it as you want.

## Titles
I wanted to have the h1 being the title of the page, so i reduced the level of tags.
Titles were the first try to use custom component, so i've add some customizations into them too. Feels free to change it.