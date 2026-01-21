import { useEffect, useState, useRef } from "react";
import {
  searchProducts,
  getCategories,
  getProductsByCategory,
} from "../api/openFoodApi";

import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import BarcodeSearch from "../components/BarcodeSearch";
import CategoryFilter from "../components/CategoryFilter";
import SortDropdown from "../components/SortDropdown";
import Loader from "../components/Loader";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const pageRef = useRef(1);

  // Load categories once
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data.slice(0, 20));
    });
  }, []);

  // Reset & fetch when search changes
  useEffect(() => {
    setActiveCategory("");
    resetAndFetch();
  }, [search]);

  // Scroll listener (ONE TIME, CLEAN)
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 150 &&
        !loading &&
        hasMore
      ) {
        fetchProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const resetAndFetch = () => {
    setProducts([]);
    setHasMore(true);
    pageRef.current = 1;
    fetchProducts(true);
  };

  const fetchProducts = async (isReset = false) => {
    setLoading(true);

    let data = [];

    if (activeCategory) {
      const all = await getProductsByCategory(activeCategory);
      data = all.slice(
        (pageRef.current - 1) * 20,
        pageRef.current * 20
      );
    } else {
      data = await searchProducts(search, pageRef.current);
    }

    const valid = data.filter((p) => p && p.code);

    if (valid.length === 0) {
      setHasMore(false);
      setLoading(false);
      return;
    }

    setProducts((prev) =>
      isReset ? valid : [...prev, ...valid]
    );

    pageRef.current += 1;
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      

      {/* Controls */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <SearchBar onSearch={setSearch} />
        <BarcodeSearch />

        <CategoryFilter
          categories={categories}
          onChange={(cat) => {
            setSearch("");
            setActiveCategory(cat);
            resetAndFetch();
          }}
        />

        <SortDropdown onSort={() => {}} />
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p.code} product={p} />
        ))}
      </div>

      {/* Loader */}
      {loading && <Loader />}

      {!hasMore && (
        <p className="text-center text-gray-500 mt-4">
          No more products
        </p>
      )}
    </div>
  );
}
