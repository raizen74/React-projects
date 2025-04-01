import React, { useContext } from "react";
// import { useDispatch } from 'react-redux';
import { useStore } from "../../hooks-store/store";
import Card from "../UI/Card";
import "./ProductItem.css";
// import { ProductsContext } from '../../context/products-context';
// import { toggleFav } from '../../store/actions/products';

const ProductItem = React.memo((props) => {
  console.log('RENDERED')
  // const dispatch = useDispatch();
  // const toggleFav = useContext(ProductsContext).toggleFav;
  const dispatch = useStore(false)[1]; // this component does not register a listener in the global listeners array
  const toggleFavHandler = () => {
    // toggleFav(props.id);
    // dispatch(toggleFav(props.id));
    dispatch("TOGGLE_FAV", props.id);
  };

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <div className='product-item'>
        <h2 className={props.isFav ? "is-fav" : ""}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? "button-outline" : ""}
          onClick={toggleFavHandler}
        >
          {props.isFav ? "Un-Favorite" : "Favorite"}
        </button>
      </div>
    </Card>
  );
});

export default ProductItem;
