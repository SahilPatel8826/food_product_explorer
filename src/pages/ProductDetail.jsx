import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByBarcode } from "../api/openFoodApi";

export default function ProductDetail() {
  const { barcode } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductByBarcode(barcode)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [barcode]);

  if (loading) {
    return (
      <p className="text-center text-gray-400 mt-10">
        Loading product details...
      </p>
    );
  }

  if (!product) {
    return (
      <p className="text-center text-red-500 mt-10">
        Product not found
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Top Section */}
      <div className="bg-white shadow rounded p-6 flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={product.image_front_url}
            alt={product.product_name}
            className="h-64 object-contain mx-auto"
          />
        </div>

        {/* Basic Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">
            {product.product_name || "No name available"}
          </h1>

          <p className="text-sm text-gray-600 mb-1">
            Brand: {product.brands || "N/A"}
          </p>

          <p className="text-sm text-gray-600 mb-3">
            Category: {product.categories || "N/A"}
          </p>

          <span className="inline-block px-3 py-1 text-sm font-semibold rounded bg-green-100 text-green-700">
            Nutrition Grade: {product.nutrition_grades || "N/A"}
          </span>
        </div>
      </div>

      {/* Ingredients */}
      <div className="bg-white shadow rounded p-6 mt-6">
        <h2 className="text-lg font-semibold mb-2">
          Ingredients
        </h2>
        <p className="text-sm text-gray-700">
          {product.ingredients_text || "Ingredients not available"}
        </p>
      </div>

      {/* Nutrition Table */}
      <div className="bg-white shadow rounded p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">
          Nutrition Information (per 100g)
        </h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <NutritionItem label="Energy" value={product.nutriments?.energy} unit="kcal" />
          <NutritionItem label="Fat" value={product.nutriments?.fat} unit="g" />
          <NutritionItem label="Carbohydrates" value={product.nutriments?.carbohydrates} unit="g" />
          <NutritionItem label="Proteins" value={product.nutriments?.proteins} unit="g" />
          <NutritionItem label="Sugars" value={product.nutriments?.sugars} unit="g" />
          <NutritionItem label="Salt" value={product.nutriments?.salt} unit="g" />
        </div>
      </div>

      {/* Labels */}
      <div className="bg-white shadow rounded p-6 mt-6">
        <h2 className="text-lg font-semibold mb-2">
          Labels
        </h2>

        {product.labels ? (
          <div className="flex flex-wrap gap-2">
            {product.labels.split(",").map((label) => (
              <span
                key={label}
                className="px-3 py-1 text-xs bg-gray-100 rounded"
              >
                {label}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No labels available
          </p>
        )}
      </div>
    </div>
  );
}

/* Small helper component */
function NutritionItem({ label, value, unit }) {
  return (
    <div className="flex justify-between border-b pb-1">
      <span>{label}</span>
      <span className="font-medium">
        {value !== undefined ? `${value} ${unit}` : "N/A"}
      </span>
    </div>
  );
}
