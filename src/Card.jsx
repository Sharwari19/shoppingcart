import { useState } from "react"
import { useEffect } from "react"
import Loader from "./Loader";
import './Card.css'

export default function Card()
{
  const [products, setProducts] = useState([]);
  const [DescriptionId, setDescriptionId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favouriteId, setFavouriteId] = useState(null);

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
    .then((response) => {
      if(response.status >= 400)
      {
        throw new Error("Error fetching products");
      }
      return response.json();
    })
    .then((data) => {
      console.log('Fetched data:', data);
      (setProducts(data))
    })
    .catch((error) => {
      setError(error)
    })
    .finally(() => (setLoading(false)));
  }, [])

  if(error)
  {
    console.log('Error', error);
    return (
      <p>A network error occurred</p>
    );
  }
  
  if(loading)
  return(
    <Loader />
  )

  function handleDescription(id)
  {
    setDescriptionId(prevDescriptionId => ((prevDescriptionId === id) ? null : id ));
  }

  function handleIncrement(id)
  {
    const incrementedProduct = products.find((prevProduct) => prevProduct?.id === id)
    if(incrementedProduct?.quantity)
    {
      setProducts((prevProducts) => {
        const updatedProducts = prevProducts.map((prevProduct) => (prevProduct?.id === id) ? {...prevProduct, quantity : prevProduct?.quantity + 1} : prevProduct)
        console.log(updatedProducts?.quantity);
        return updatedProducts;
      })
    }
    else
    {
      setProducts((prevProducts) => {
        const updatedProducts = prevProducts.map((prevProduct) => (prevProduct.id === id) ? {...prevProduct, quantity : 1} : prevProduct)
        console.log(updatedProducts.quantity);
        return updatedProducts;
      })
    }  
  }

  function handleDecrement(id)
  {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((prevProduct) => (prevProduct.id === id) ? {...prevProduct, quantity : prevProduct?.quantity - 1} : prevProduct)
      return updatedProducts;
    })
  }

  function handleFavourite(id)
  {
   
    setFavouriteId((prevFavouriteId) => {
      (prevFavouriteId === id) ? null : id
    });

  /*
    
    const favouriteProduct = products.find((prevProduct) => prevProduct.id === id);
    if(favouriteProduct?.isFavourite)
    {
      setProducts((prevProducts) => {
        prevProducts.map((prevProduct) => prevProduct.id === id ? {...prevProduct, isfavourite : !prevProduct.isfavourite} : prevProduct)
      })
    }
    else
    {
      setProducts((prevProducts) => {
        prevProducts.map((prevProduct) => prevProduct.id === id ? {...prevProduct, isfavourite : true} : prevProduct)
      })
    }

    console.log(favouriteProduct);
   
  */  
  }
    
  return(

      products.map((product) => {
        console.log('prevProducts', products);
          return(
              <div key={product.id} className="card">
                <div className="image-container">
                  <img 
                  src={product.images[0]}
                  alt={product.title}></img>
                </div>

                <div className="card_details">
                  <div className="price-fav">
                    <span className="product-price">${product.price}</span>
                    <span className=" material-icons">
                      <button 
                      style={{color : favouriteId === product.id ? "black" : "#eaeff1", }} 
                      onClick={() => (handleFavourite(product.id))} 
                      className="favourite"
                      >&#xe87d;</button>
                    </span>
                  </div>
                  
                  <div className="rating-div">
                    {/*<span className="product-ratings">Rating: {product.rating.rate}</span>*/}
                  </div>
    
                  <div className="name">{product.title}</div>

                  <button 
                  onClick={() => (handleDescription(product.id))}
                  className="description-btn">
                  {(DescriptionId === product.id) ? 'Hide' : 'Show Description'}</button>
                  {(DescriptionId === product.id) && <div>{product.description}</div>}

                  <div className="plus-minus-btn">
                      <button
                      className="plus-btn"
                      onClick={() => (handleIncrement(product.id))}>+</button>
                      {product?.quantity || 0}
                      {((product?.quantity) === 0) ? 
                      (<button
                      className="minus-btn"
                      disabled
                      onClick={() => handleDecrement(product.id)}
                      >-</button> ) : (
                      <button
                      className="minus-btn"
                      onClick={() => handleDecrement(product.id)}
                      style={{ marginLeft: 10 }}
                      > -</button>
                      ) }
                  </div>

                  <button
                  className="add-cart-btn"
                  >Add to Cart</button>
                </div>
              </div>
          )
      })
        
  )
}