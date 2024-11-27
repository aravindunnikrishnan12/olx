//src/components/create.jsx
// src/components/create.jsx

import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { useNavigate } from 'react-router-dom';
import { FirebaseContext, AuthContext } from "../../store/FirebaseContext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const Create = () => {
  const { firebaseApp } = useContext(FirebaseContext); // Use firebaseApp for modular SDK
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]); // State for multiple images
  const date = new Date();

  const handleSubmit = async () => {
    console.log("Submit button clicked.");

    if (!user) {
      alert("Please login to create a post.");
      return;
    }

    if (name.trim() === "" || /[^\w\s]/.test(name)) {
      alert("Name cannot be empty and should not contain special characters.");
      return;
    }

    if (category.trim() === "" || /[^\w\s]/.test(category)) {
      alert("Category cannot be empty and should not contain special characters.");
      return;
    }

    if (price < 0) {
      alert("Price cannot be negative.");
      return;
    }

    if (images.length === 0) {
      alert("Please select at least one image before submitting.");
      return;
    }

    try {
      console.log("User is logged in. Proceeding with upload.");
      const storage = getStorage(firebaseApp); // Get Firebase storage instance

      const imageUrls = await Promise.all(images.map(async (image) => {
        const imageRef = ref(storage, `images/${image.name}`); // Create storage reference
        console.log("Uploading image:", image.name);
        await uploadBytes(imageRef, image); // Upload the image
        const imageUrl = await getDownloadURL(imageRef); // Get the download URL
        console.log("Image uploaded. URL:", imageUrl);
        return imageUrl;
      }));

      const firestore = getFirestore(firebaseApp); // Get Firestore instance
      await addDoc(collection(firestore, "products"), {
        name,
        category,
        price,
        urls: imageUrls, // Save multiple image URLs
        userid: user.uid,
        createdAt: date.toDateString(),
      });
      console.log("Product data saved to Firestore");

      navigate("/"); // Redirect to home after successful post
    } catch (error) {
      console.error("Error uploading files or saving data:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <label htmlFor="name">Name</label>
        <br />
        <input
          className="input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          name="Name"
        />
        <br />
        <label htmlFor="category">Category</label>
        <br />
        <input
          className="input"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          id="category"
          name="category"
        />
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input
          className="input"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          id="price"
          name="Price"
        />
        <br />
        <br />
        {images.length > 0 && (
          <div>
            {images.map((image, index) => (
              <img
                key={index}
                alt="Preview"
                width="200px"
                height="200px"
                src={URL.createObjectURL(image)}
              />
            ))}
          </div>
        )}
        <br />
        <input
          type="file"
          multiple // Allow multiple files
          onChange={(e) => setImages(Array.from(e.target.files))}
        />
        <br />
        <button onClick={handleSubmit} className="uploadBtn">
          Upload and Submit
        </button>
      </div>
    </Fragment>
  );
};

export default Create;
