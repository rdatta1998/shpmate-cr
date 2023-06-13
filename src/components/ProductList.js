import React, { useState, useEffect, useCallback } from "react";
import { useFetch } from "../hooks/useFetch";
import Loading from "../assets/loading-gif-png-5.gif";

export const ProductList = () => {
  // const [products, setProducts] = useState([]);

  const [url, setUrl] = useState("http://localhost:8001/products");
  const [count, setCount] = useState(0);
  const { data: products, loading, error } = useFetch(url,{content:"ABC"});

  // const fetchProducts = useCallback(async () => {
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   setProducts(data);
  // }, [url]);

  // useEffect(() => {
  //   fetchProducts();
  //   console.log("-");
  // }, [fetchProducts]);

  //   WHEN FUNCTION IS OUTSIDE

  //   const fetchProducts = async () => {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setProducts(data);
  //   };

  //   useEffect(() => {
  //     fetchProducts();
  //     console.log("1");
  //   }, [fetchProducts]);   leads to infinite loop

  // WHEN FUNCTION IS INSIDE USEEFFECT

  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       const response = await fetch(url);
  //       const data = await response.json();
  //       setProducts(data);
  //     };
  //     fetchProducts();
  //   }, [url]);

  // useEffect(() => {
  //   console.log(count);
  // }, [count]);

  return (
    <section>
      <div className="filter">
        <button onClick={() => setCount(count + 1)}>{count}</button>
        <button onClick={() => setUrl("http://localhost:8001/products")}>
          All
        </button>
        <button
          onClick={() => setUrl("http://localhost:8001/products?in_stock=true")}
        >
          In Stock only
        </button>
      </div>
      {error && <p>{error}</p>}
      {loading && (
        <p className="loading">
          <img src={Loading} />
        </p>
      )}
      {products &&
        products.map((product) => (
          <div className="card" key={product.id}>
            <p className="id">{product.id}</p>
            <p className="name">{product.name}</p>
            <p className="info">
              <span>${product.price}</span>
              <span className={product.in_stock ? "instock" : "unavailable"}>
                {product.in_stock ? "instock" : "unavailable"}
              </span>
            </p>
          </div>
        ))}
    </section>
  );
};
