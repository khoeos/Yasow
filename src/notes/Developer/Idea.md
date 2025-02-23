Display markdown is quite easy today, especially with a Next.js website, there is plenty of solutions to do it.
But obsidian has 1 one major design feature which « complicate » it’s integration : The link system.
One of the goal is to have a seamless experience on a website, so i had to handle the backlinkgs and the automatic link between files using obsdidian `[[` method.

The solution that i came into, and other before me is to have the data of all files at the very beginning, and for each, at least the name and the path on the website (or the base to build it)

I know there is a lot of ways to do it, but i take 3 points in consideration
- It has to work with most of the services that support next out of the box
- It has to be quite optimized, at least avoid parsing for each file
- It’s purely personal : it has to work with my vps configuration with little to no config (check [[Deploy]] )

So i came with using api routes to get the data, and take into account the caching of next to avoid too much parsing.

One of the best alternative is to use a file in some way, like a json pre-built or anything like it, but i wanted to try my own way.

## In a practical terms

I have a main route `/api/getData` that is the core of this idea, it’s a get request that output all the data needed afterward.

I have a utility function to fetch this endpoint used in other endpoints or server components.

Because this endpoint have access to basically every files, i wanted a way to protect it, and i find the simple solution of and environment variable for a secret key, used in other server side request, that is needed to fetch the data => only the server side of the website can fetch it.

You can have mote infos in [[Optimization]]

## Points to concider
I know this method may not be the better way to do it, and may not be compatible with some other types of hosting/build output, i haven’t tried building a fully static site so there is probably work to do with that.

## Further possibilities
After i have the idea of this method, i found another advantage for future usages : it open a whole new possibilities to fetch the content, especially for external services.