This is a [Next.js](https://nextjs.org) project to demonstrate a [bug with dynamic routes](https://github.com/vercel/next.js/issues/77789).

> [!IMPORTANT]
> The issue is now fixed in Next.js [15.3.1-canary.2](https://github.com/vercel/next.js/releases/tag/v15.3.1-canary.2)

## Description

Under certain conditions, for a page with dynamic route an incorrect params are passed to the page

The error is reproducing for me when the following conditions are met:

- the page in question has a dynamic route
- the parent route of the dynamic route has PPR (Partial Prerendering) enabled
- a middleware is used to rewrite an original URL to patch a route (prepend a locale in my case)
- the project is deployed on Vercel

> [!IMPORTANT]
> Note #1: The issue is not reproducible locally.

> [!IMPORTANT]
> Note #2: The parameters are passed correctly when navigating to the page from another route. The issue reproduces only when the page is loaded directly, or by refreshing the page.

## Steps to Reproduce

I have a [deployed](https://nextjs-dynamic-beta.vercel.app/) version of the project on Vercel, where you can see the issue in action.

### Reproduce 1: with page refresh

1. Go to the [deployed](https://nextjs-dynamic-beta.vercel.app/) site

2. Click the `Go to the test page` link

   - the page has correct params (OK)

3. Refresh the page

   - the page has incorrect params, first segment of `rest` is missing and is incorrectly recognized as `locale` (BUG)

### Reproduce 2: with a direct link

1. Go to the [test page](https://nextjs-dynamic-beta.vercel.app/folder/page) directly

   - the page has incorrect params, first segment of `rest` is missing and is incorrectly recognized as `locale` (BUG)
