## Advanced Redux

Never mutate Redux state outside of the reducer.

If you have **sync code** and **free of side effects**: Put the logic inside the **Reducer**. Avoid putting that logic in the **component** or in the **actions**

Connection to **firebase database** in `cart-actions.js`, called from `App.js` and rendering HTTP requests in the `Notification.js` component.