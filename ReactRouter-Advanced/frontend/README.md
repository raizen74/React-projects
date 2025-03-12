- `Root.js` -> navigator = useNavigation(), `navigation.state` gives access to `loader` state, so we can perform logic based on if `loader` (executed by React Router) is executing

- useLoaderData automatically extracts data from a `Response` object which is what awaiting a `fetch` returns. Check `Events.js`

- Errors in a route bubble up, example of error fetching data in `Events.js` bubbles up to `/` and is handled by `errorElement`

- Each route can have an `id`, useful to get the `loader` from this route when using it in children and siblings

- `Form` `actions`, check `EventForm.js` and `NewEvent.js`
- `useFetcher` hook to interact with an action or form without transitioning.`NewsletterSignup.js`

- **defer** data fetching and show a fallback text meanwhile, `Suspense` and `Await` -> `Events.js` and `EventDetail.js`