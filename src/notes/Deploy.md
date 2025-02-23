I wont go into the details of the different ways to deploy a Next.js app as i have not tested a lot of them, there is plenty of resources on the web for that.

The website is a basic app, so almost every way to host it will work.

One point to concider : the data being fetched server-side, and the notes pages being dynamic, there may be some modifications to be made for certain hosting methods, in particular on everything that is 100% static.

No matter how you deploy, **don't forget** to set the environment variables you'll find in `.env.example`

## Vercel
Vercel is basically the best way to deploy a Next.js app.

You just have to have a repository containing the app and the markdown files, and it will build and deploy the website automatically.

It can have some limitations though, specifically depending on how you want to host your vault because everything has to be in the same repository.

## My hosting method (linux vps)
As i said in [[Idea]], i wanted to have a simple way to deploy the website, and i wanted to avoid as much as possible the configuration giving the setup that i personnaly use, so i'll go into the details if you want to do the same.

I have a linux vps for all of my projects, and i use a simple caddy with pm2 to host the website.

To sum up, caddy is a very basic open source web server that is very easy to configure and with automatic https. I mainly use the reverse proxy feature to redirect the requests to the pm2 process.

Pm2 is a simple process manager for node.js apps, easy to configure and use, that handle logs, automatic restarts and other features.

You can check my gist here for a quick guide :
[https://gist.github.com/khoeos/d434965912fb65428331e7c166de92b6](https://gist.github.com/khoeos/d434965912fb65428331e7c166de92b6)

### Why this setup for this case ?
Apart from not wanting to do differently what I already use, my goal is to have 2 repositories :
- One for the website
- One for the obsidian's vault

And everytimes i push to the vault, the website has to be updated automatically. And with vercel i don't have natively this flexibility.

I can easily setup a ci/cd pipeline with github actions to build and deploy the website on the vps, and i can have a lot of control on the process.

I'll probably check a way to use the on remand revalidate to have a better way to update the app without rebuilding it every time.
