One of the first problem i ran is how convert the obsidian's link format into a working system for Next.

I came to the conclusion that i need to parse every markdown files loaded to get the name, path and other infos. From what i saw, some others alternatives came to the same conclusion, but how to optimize this to not have to parse at each page load ?

The first solution from Mindstone is to execute a function that write a jsonfile with all the data needed, the file is generated on first fetch and used after that. This is probably one of the best and easiest solution, but i wanted to try something else. Some hosting method don't really support read/write files between builds, or that are not created on build time.

So i decided to use the next's api routes and caching methods manage the data-fetching, it's for me the most reliable method. And for further extend, i can imagine a day where the data will be fetcher from a database or a server, it open a lot of possibilities.

_In reality, i din't test if it's really that effective, i don't have so much data to note any difference, and with all the build output options, maybe this is not the best way to do, i'll see that later._

So in short, i have 2 main routes :

- `/api/getData` - parse all the files and return the array of the files with the needed datas
  - This is the one which has to be cached
- `/api/getFile` - with the slug in parameter from the next [...slug] params on the body, fetch the `/api/getData` and return the specified file

The object representing the file :

```json
{
  "id": "id-path-to-the-file",
  "name": "Name of the file without .md",
  "aliases": ["array", "of", "aliases"],
  "data": {}, // the data from the file
  "content": "the markdown content of the file",
  "path": "/path/to/the/file"
}
```
