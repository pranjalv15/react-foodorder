import { currencyformatter } from "../util/formatting";
import { useContext } from "react";
import CartContext from "../store/CartContext";

function Meals({ meals }) {
  const { addItem } = useContext(CartContext);

  function handleAddtoCart(meal) {
    addItem(meal);
  }
  return (
    <ul id="meals">
      {meals.map((meal) => {
        return (
          <li className="meal-item" id={meal.id} key={meal.id}>
            <article>
              <img src={`http://localhost:3000/${meal.image}`} alt="item" />
              <div>
                <h3>{meal.name}</h3>
                <p className="meal-item-price">
                  {currencyformatter.format(meal.price)}
                </p>
                <p className="meal-item-description">{meal.description}</p>
              </div>
              <p className="meal-item-actions">
                <button
                  onClick={() => handleAddtoCart(meal)}
                  className="button"
                >
                  Add to Cart
                </button>
              </p>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
export default Meals;
