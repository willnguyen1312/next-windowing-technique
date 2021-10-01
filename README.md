# My playground with Next.js and windowing technique 🎉

P/s: The image would be cached effectively via [Cache-Control header]([https://link](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)) to avoid browsers need to download all over again from the servers.

In case we can't cache image at all (for some reasons such as security - image should be available to authenticated users only. Hence, we can't leverage Next Image optimization technique sadly 🥲), we can consider using the [LRU cache](https://github.com/isaacs/node-lru-cache) for efficiently keeping minimal amount of memory footprint while preserve silky smooth scrolling experience for users.
