By default, the obsidian files are located locally in the `src/notes` folder.
You can change this to distance source files by setting the `SOURCE` environment variable to `distant` and set DISTANT_STATIC_URL to the URL of your distant source files.

This is a work in progress, and the following features are not fully implemented and tester, i've made it work for my own use case, but it may not work for you.

## My method

All my notes are saved in a git repository, cloned on my own vps.
I've made a basic express server to serve the files and have the data needed to use functions used for the local source without much changes.

In the git repository, you have the folded `distant-server-exemple` for the code i use to serve the files.

It's very basic and straightforward, launched with a pm2 process and a simple caddy reverse proxy to handle the https and the domain.

the main entrypoint return a json array with the urls of all the files, thats all you need to use the distant source.
