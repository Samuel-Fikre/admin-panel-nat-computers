"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ImageUpload from "./image-upload"; // Adjust the import path as necessary
import Image from "next/image";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  category: assignedCategory,
  images: existingImages = [],
  properties: assignedProperties,
  // Default to empty array if not provided
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, SetProductProperties] = useState(
    assignedProperties || {}
  );
  const [images, setImages] = useState(existingImages);
  const [categories, setCategories] = useState([]);
  // Initialize with existing images

  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  // Handler to receive uploaded image URLs from ImageUpload component
  const handleImageUpload = (uploadedUrls) => {
    setImages((prevImages) => [...prevImages, ...uploadedUrls]);
  };

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };
    try {
      if (_id) {
        await axios.put("/api/products", { ...data, _id });
      } else {
        await axios.post("/api/products", data);
      }
      setGoToProducts(true);
    } catch (error) {
      console.error("Failed to save product:", error);
      alert("There was an error saving the product.");
    }
  }

  if (goToProducts) {
    router.push("/products");
  }

  function SetProductProp(propName, value) {
    SetProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let CatInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...CatInfo.properties);
    while (CatInfo?.parent?.id) {
      const parentCat = categories.find(
        ({ _id }) => _id === CatInfo?.parent?.id
      );
      propertiesToFill.push(...parentCat.properties);
      CatInfo = parentCat;
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <label htmlFor="title">Product Name</label>
      <input
        id="title"
        type="text"
        placeholder="Product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        required
      />

      <label>Category</label>

      <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
        <option value="">UnCategorized</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>
      {propertiesToFill.length > 0 &&
        propertiesToFill.map((p) => (
          <div key={p.name} className="flex gap-1">
            <div>{p.name}</div>
            <select
              value={productProperties[p.name]}
              onChange={(ev) => SetProductProp(p.name, ev.target.value)}
            >
              {p.values.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        ))}

      <label htmlFor="photos">Photos</label>
      <div id="photos" className="mb-2 flex flex-wrap gap-2">
        {images.length > 0 ? (
          images.map((link, index) => (
            <div key={link} className="relative h-24">
              <Image
                src={link}
                alt={`Product Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              {/* Optional: Add a remove button for each image */}
            </div>
          ))
        ) : (
          <div>No photos in this product</div>
        )}

        {/* Include the ImageUpload component and pass handleImageUpload as prop */}
        <ImageUpload onUpload={handleImageUpload} />
      </div>

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        placeholder="Description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />

      <label htmlFor="price">Price (in ETB)</label>
      <input
        id="price"
        type="number"
        placeholder="Price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
        required
      />

      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
