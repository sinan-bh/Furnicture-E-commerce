import React, { useEffect } from "react";
import List from "../Products/List";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../lib/store/features/productSlice";
import Spinner from "../../../popup box/Spinner";

function SearchItem() {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector(state=> state.user);

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message || JSON.stringify(error)}</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products found.</div>;
  }

  const list = products?.filter(
    (item) =>
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!list || list?.length === 0) {
    return (
      <div className="container card list-not">
        <div className="text-center">Not Found Searched Item</div>
      </div>
    );
  }

  return (
    <div className="container pt-5">
      <h2 className="text-center pt-5 mt-5">Searched Items are...!</h2>
      <div className="search">
        {list?.map((item) => (
          <List key={item._id} list={item}></List>
        ))}
      </div>
    </div>
  );
}

export default SearchItem;
