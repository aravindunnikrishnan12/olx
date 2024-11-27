// //src/components/posts/post.jsx
// src/components/posts/Post.jsx
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../store/FirebaseContext";
import { collection, getDocs } from "firebase/firestore";
import { PostContext } from "../../store/PostContext";
import { AuthContext } from "../../store/FirebaseContext";
import Heart from "../../assets/Heart";
import "./Post.css";

function Posts() {
  const { firestore } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, "products"));
        const allPost = snapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));
        setProducts(allPost);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [firestore]);

  const handleViewPost = (product) => {
    setPostDetails(product); // Set post details
    navigate("/view"); // Navigate to View component
  };

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div
              className="card"
              key={product.id}
              onClick={() => handleViewPost(product)} // Use the handler
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="featured">FEATURED</div>
              <div className="image">
                <img src={Array.isArray(product.urls) && product.urls.length > 0 ? product.urls[0] : product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9;{product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {user && (
        <div className="recommendations">
          <div className="heading">
            <span className="recommendation-title">Fresh recommendations</span>
          </div>
          <div className="cards">
            {products.map((product) => (
              <div className="card" key={product.id}>
                <div className="favorite">
                  <Heart />
                </div>
                <div className="image">
                  <img src={Array.isArray(product.urls) && product.urls.length > 0 ? product.urls[0] : product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9;{product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Posts;
