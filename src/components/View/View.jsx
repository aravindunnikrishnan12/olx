// //src/components/View/View.jsx
// import React,{useState,useEffect,useContext} from 'react';
// import './View.css';
// import { PostContext } from '../../store/PostContext';
// import { FirebaseContext } from '../../store/FirebaseContext';
// import { useNavigate } from "react-router-dom"; 

// function View() {
//   const [userDetails, setUserDetails] = useState(null);
//   const { postDetails } = useContext(PostContext);
//   const { firebase } = useContext(FirebaseContext);
// const navigate = useNavigate()
//   const currentUserID = firebase.auth().currentUser?.uid;


//   useEffect(() => {
//     const { userId } = postDetails;
//     if (userId) {
//       firebase.firestore().collection('users').where('id', '==', userId).get().then((res) => {
//         res.forEach(doc => {
//           setUserDetails(doc.data());
//         });
//       });
//     }
//   }, [firebase, postDetails]);
//   const handleDelete = async () => {
//     try {
//       await firebase.firestore().collection('products').doc(postDetails.id).delete();
//       console.log('Product deleted successfully');
//      navigate("/") // Redirect to home page after deletion
//     } catch (error) {
//       console.error('Error deleting product: ', error);
//     }
//   };

//   if (!postDetails) return <p>Loading...</p>;
//   return (
//     <div className="viewParentDiv">
//       <div className="imageShowDiv">
//       <img src={postDetails.url} alt={postDetails.name} />
//       </div>
//       <div className="rightSection">
//         <div className="productDetails">
//           <p>&#x20B9; {postDetails.price}</p>
//           <span>{postDetails.name}</span>
//           <p>{postDetails.category}</p>
//           <span>{new Date(postDetails.createdAt.seconds * 1000).toDateString()}</span>
//         </div>
//         {userDetails && (
//           <div className="contactDetails">
//             <p>Seller details</p>
//             <p>{userDetails.username}</p>
//             <p>{userDetails.phone}</p>
//           </div>
//         )}
//          {currentUserID === postDetails.userId && (
//           <button onClick={handleDelete} className="deleteButton">Delete Product</button>
//         )}
//       </div>
//     </div>
//   );
// }
// export default View;


// import React, { useState, useEffect, useContext } from 'react';
// import './View.css';
// import { PostContext } from '../../store/PostContext';
// import { AuthContext, FirebaseContext } from '../../store/FirebaseContext';
// import { useNavigate } from "react-router-dom";

// function View() {
//   const [userDetails, setUserDetails] = useState(null);
//   const { postDetails } = useContext(PostContext);
//   const { auth, firestore } = useContext(FirebaseContext);
//   const navigate = useNavigate();
//   const currentUserID = auth.currentUser?.uid;
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     // const { userId } = postDetails;
//     const { uid } = user;
//     console.log('user ud s',uid)
//     let userId = uid
//     if (userId) {
//       console.log('userId',userId);
      
//       firestore.collection('users').where('id', '==', userId).get().then((res) => {
//         res.forEach(doc => {
//           setUserDetails(doc.data());
//         });
//       });
//     }
//   }, [firestore, postDetails]);

//   const handleDelete = async () => {
//     try {
//       await firestore.collection('products').doc(postDetails.id).delete();
//       console.log('Product deleted successfully');
//       navigate("/"); // Redirect to home page after deletion
//     } catch (error) {
//       console.error('Error deleting product: ', error);
//     }
//   };

//   if (!postDetails) return <p>Loading...</p>;

//   return (
//     <div className="viewParentDiv">
//       <div className="imageShowDiv">
//         <img src={postDetails.url} alt={postDetails.name} />
//       </div>
//       <div className="rightSection">
//         <div className="productDetails">
//           <p>&#x20B9; {postDetails.price}</p>
//           <span>{postDetails.name}</span>
//           <p>{postDetails.category}</p>
//           <span>{new Date(postDetails.createdAt.seconds * 1000).toDateString()}</span>
//         </div>
//         {userDetails && (
//           <div className="contactDetails">
//             <p>Seller details</p>
//             <p>{userDetails.username}</p>
//             <p>{userDetails.phone}</p>
//           </div>
//         )}
//         {currentUserID === postDetails.userId && (
//           <button onClick={handleDelete} className="deleteButton">Delete Product</button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default View;




// src/components/View/View.jsx
import React, { useState, useEffect, useContext } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { AuthContext, FirebaseContext } from '../../store/FirebaseContext';
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import ConfirmationPopup from "../Confirmation/ConfirmationPopup";

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to show/hide confirmation popup
  const { postDetails } = useContext(PostContext);
  const { auth, firestore } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const currentUserID = auth.currentUser?.uid;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const fetchUserDetails = async () => {
        const usersCollection = collection(firestore, 'users');
        const q = query(usersCollection, where('id', '==', user.uid));
        
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setUserDetails(doc.data());
          });
        }
      };
      fetchUserDetails();
    }
  }, [firestore, user]);

  const handleDelete = async () => {
    if (postDetails?.id) {
      const productRef = doc(firestore, 'products', postDetails.id);
      await deleteDoc(productRef);
      console.log('Product deleted successfully');
      navigate("/"); // Redirect to home page after deletion
    }
  };

  // Show confirmation popup when delete is clicked
  const showDeleteConfirmation = () => {
    setShowPopup(true);
  };

  // Handle confirmation popup response
  const handleConfirmDelete = () => {
    setShowPopup(false); // Close the popup
    handleDelete(); // Proceed with deletion
  };

  const handleCancelDelete = () => {
    setShowPopup(false); // Just close the popup
  };

  if (!postDetails) return <p>Loading...</p>;

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        {Array.isArray(postDetails.urls) && postDetails.urls.length > 1 ? (
          postDetails.urls.map((url, index) => (
            <img
              key={index}
              className={index === 0 ? "mainImage" : "secondaryImage"}
              src={url}
              alt={postDetails.name}
            />
          ))
        ) : (
          <img
            className="mainImage"
            src={(Array.isArray(postDetails.urls) && postDetails.urls.length > 0)
              ? postDetails.urls[0]
              : postDetails.url}
            alt={postDetails.name}
          />
        )}
      </div>

      <div className="rightSection">
        <div className="productDetails">
          <p>Price:&#x20B9;{postDetails.price}</p>
          <span>Name:{postDetails.name}</span>
          <p>Category:{postDetails.category}</p>
          <span>Date:{new Date(postDetails.createdAt).toDateString()}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>Username:{userDetails.username}</p>
            <p>Ph_No:{userDetails.phone}</p>
          </div>
        )}
        {currentUserID === postDetails.userid && (
          <>
            <button onClick={showDeleteConfirmation} className="deleteButton">Delete Product</button>
            {showPopup && (
              <ConfirmationPopup
                message="Are you sure you want to delete this product?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default View;
