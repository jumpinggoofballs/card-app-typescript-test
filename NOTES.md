# Notes

- I have double commits for every step in Github. This is a bug from VSCode Insiders. Was not a priority to fix while I was working on the rest of this.
- Backend `npm install` warned about vulnerabilities so I ran both `npm update` and subsequently `npm audit fix --force`
- Prisma does not have `binaryTargets` for my up-to-date Fedora so had to use an Ubuntu 22.04 container
- The Ubuntu 22.04 default version of `node` is incompatible with the codebase, so had to update that independent of the distribution. (So using version 21.x)
- Frontend `npm install` warned about vulnerabilities, and I fixed them with `npm audit fix --force`

## Exercise requirements

1.  - Since there was no set-up for the normal Tailwind way of implementing "dark mode" (https://tailwindcss.com/docs/dark-mode) I decided against going through all the elements in the app to add custom `class="dark:*"` and instead did a global tailwind `class="invert"` on the root `<section>` of the React App.tsx. This looks suprisingly okay without further tweaking.
    - Implemented the functionality to change theme by adding a `ThemeProvider` to `main.tsx` and implementing a boolean switch in a nav-bar button. Not implemented possible refinement: save the theme state either in the database, or in browser localStorage.
2.  - Added `scheduled_for` column to the database by adding that field to the Entry model in `backend/prisma/schema.prisma` and running `npx prisma migrate dev --name added_scheduled_for_column`
    - It does not make sense to have an input field for when an event was created. So I converted that input field for the new field of `scheduled_for`, and I set `created_at` to the present `Date()` in all appropriate places.
3.  - Testing is set up with `jest`, so tried working with that - even though the official documentation for `fastify` does not cover `jest` and instead they recommend using `tap`.
    - I was weary of adding dependencies to the provided code, so I avoided setting up anything like `supertest` or `jest-mock-extended`. That means I am running the tests on the same database as the live app. Advantage: verifies that the actual server + database are working well. Disadvantage: temporarily adds garbage data into the actual database (at least in the local dev environment).
