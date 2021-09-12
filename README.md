## Project description

This a phone catalog app built with Firebase, Next, React TypeScript and tailwindcss.

The fontend displays a collection of phones stored in Firebase and the user can see all the phone features by clicking on the items.

It also has a backend for admintrating the catalog that allows authenticated users to add, modify or remove items from the catalog.

### Demo

Visit the [Demo](https://dcsl-phone-catalog.vercel.app/)

## Local development

In order to connect with firebase you need to create some credentials and add them to and .env.local file.

Please follow any tutorial to create a firebase app in case you don't have one.

Then follow this instructions to [create and setup a firebase service account](https://firebase.google.com/docs/admin/setup#set-up-project-and-service-account).

Lastly follow the instructions of this [tutorial to encrypt the service account](https://vercel.com/support/articles/how-do-i-workaround-vercel-s-4-kb-environment-variables-limit) and add the secrets and the generated Base64 to your .env.local file.

This last step is only necessary because due to an issue with environment variables in vercel.

Please take a look to the .env.local.example to see how environment variables are structured.

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
