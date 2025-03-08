import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";
import { FIREBASE_CONFIG } from "./firebaseconf.js";
import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

const FIREBASE_COLLECTION = "CART";
const app = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(app);

// FIREBASE
// Add a new DOC without specifying the document ID
// const messagesCollection = collection(db, FIREBASE_COLLECTION); //Replace 'yourCollectionName'
// // Add the document to the specified collection.  This returns a promise
// const docRef = await addDoc(messagesCollection, cart);
// console.log("Document written with ID: ", docRef.id);

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const cartDocRef = doc(db, "CART", "cart");
      const cartDocSnap = await getDoc(cartDocRef);

      if (cartDocSnap.exists()) {
        console.log("GET", cartDocSnap.data());
        return cartDocSnap.data(); //Return the data
      }
    };
    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Pending...",
        message: "Sending cart data!",
      })
    );
    // Create a reference to the specific document in the 'CART' collection
    const cartDocRef = doc(db, FIREBASE_COLLECTION, "cart");
    // Set the document with the data. `merge: true` is crucial for overwriting existing documents.
    console.log("PUT", cart);
    try {
      await setDoc(cartDocRef, cart, { merge: true });

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sending cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
