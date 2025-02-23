## How to remove the classic website part (main page is /notes)
### Use middleware to redirect to /notes (easy)
just un-comment the lines 6,7,8 in the app/middleware.ts file
```typescript
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/notes', request.url));
  }
```

### Replace the home page with notes - Not totally implemented
The most basic way is :
1. Rename or delete app/page.tsx
2. Add parenthesis in the app/notes folder
app/(notes)/page.tsx will be the first page to show up when you visit the main page.

You can also move all the content of the app/notes folder to the app folder. This way, the main page will be the notes page but you'll have to modify the app/layout.tsx to merge the 2

**WARNINGS** : This method is not fully implemented, a lot of functions and links uses hard coded notes path, i have to fix that.
