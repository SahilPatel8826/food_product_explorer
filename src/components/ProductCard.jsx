import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.code}`} className="border p-3 rounded">
      <img
        src={product.image_front_small_url}
        alt={product.product_name}
        className="h-40 mx-auto"
      />
      <h3 className="font-bold mt-2">{product.product_name}</h3>
      <p className="text-sm">{product.categories}</p>
      <p>Grade: {product.nutrition_grades}</p>
    </Link>
  );
}
