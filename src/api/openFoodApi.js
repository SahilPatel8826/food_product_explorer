import axios from "axios";

const BASE_URL = "https://world.openfoodfacts.org";

export const searchProducts = async (query, page = 1) => {
  const res = await axios.get(
    `${BASE_URL}/cgi/search.pl`,
    {
      params: {
        search_terms: query,
        page,
        page_size: 20,
        json: true,
      },
    }
  );
  return res.data.products;
};

export const getProductsByCategory = async (category) => {
  const res = await axios.get(
    `${BASE_URL}/category/${category}.json`
  );
  return res.data.products;
};

export const getProductByBarcode = async (barcode) => {
  const res = await axios.get(
    `${BASE_URL}/api/v0/product/${barcode}.json`
  );
  return res.data.product;
};

export const getCategories = async () => {
  const res = await axios.get(`${BASE_URL}/categories.json`);
  return res.data.tags;
};
