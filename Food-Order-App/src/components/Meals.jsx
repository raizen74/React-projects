// import { useState, useEffect } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {}  // the object is created once, if it were created inside the Meals component
// it would be recreate every time and triggered useHttp infinite loop

export default function Meals() {
  // We need to manage state to render a UI that depends on the data we fetch, before fetching and after fetching
  // const [loadedMeals, setLoadedMeals] = useState([]);

  // fetchMeals update state, which triggers a re-render -> infinite loop
  // useEffect(() => {
  //   async function fetchMeals() {
  //     // you could use async await instead of then, but component functions can't be async
  //     const response = await fetch("http://172.30.210.50:3000/meals", {
  //       method: "GET",
  //     }); // GET is the default method

  //     if (!response.ok) {
  //       throw new Error("Something went wrong!");
  //     }

  //     const meals = await response.json();
  //     setLoadedMeals(meals);
  //   }

  //   fetchMeals(); // fetchMeals update state, which triggers a re-render -> infinite loop
  // }, []); // empty array means this effect runs only once after the first render
  
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://172.30.210.50:3000/meals", requestConfig, []);

  console.log(loadedMeals)

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <Error title={'Failed to fetch meals'} message={error}/>;
  }

  return (
    <ul id='meals'>
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
