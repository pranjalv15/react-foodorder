import Meals from "./Meals";
import { useState, useEffect } from "react";
function AvailableMeals() {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, seterror] = useState();

  useEffect(() => {
    async function fetchMeals() {
      setIsFetching(true);

      try {
        const response = await fetch("http://localhost:3000/meals");
        const resData = await response.json();

        if (!response.ok) {
          throw new Error("failed to fetch places");
        }
        setAvailableMeals(resData);
        setIsFetching(false);
      } catch (error) {
        seterror({ message: error.message });
        setIsFetching(false);
      }
    }
    fetchMeals();
  }, []);

  if (error) {
    return <p className="center">Failed to fetch meal</p>;
  }

  let showContent = <Meals meals={availableMeals} />;
  if (isFetching) {
    showContent = <p className="center">Fetching Meals...</p>;
  }
  return showContent;
}

export default AvailableMeals;
