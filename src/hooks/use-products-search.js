import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { BASE_CONTENT_URL } from "../config/api";
import getProducts from "../helpers/api/get-products";

const useProductsSearch = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [searched, setSearched] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [suggestionIsOver, setSuggestionIsOver] = useState(false);

  const { isLoading: isSearching } = useQuery(
    ['products', { searched }],
    async ({ queryKey }) => {
      const [, { searched }] = queryKey;
      const response = await getProducts({ search: searched });

      return response.data;
    },
    {
      onSuccess: (data) => {
        setProducts(data.products.map(product => ({
          name: product.name,
          price: product.price,
          slug: product.slug,
          image: `${BASE_CONTENT_URL}${product.variants[0].variants_image[0].image_url}`
        })));
      },
      onError: (error) => console.log(error),
      enabled: !!searched
    }
  );

  const showSuggestion = ((suggestionIsOver || isFocus) && search.trim().length > 0) || isSearching;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearched(search);
    }, 400);

    return () => {
      clearTimeout(timeout);
    }
  }, [search]);

  const searchChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  const searchFocusHandler = () => {
    setIsFocus(true);
  };

  const searchBlurHandler = () => {
    setIsFocus(false);
  };

  const suggestionMouseOverHandler = () => {
    setSuggestionIsOver(true);
  };

  const suggestionMouseOutHandler = () => {
    setSuggestionIsOver(false);
  };

  return {
    search,
    products,
    showSuggestion,
    isSearching,
    searchChangeHandler,
    searchFocusHandler,
    searchBlurHandler,
    suggestionMouseOverHandler,
    suggestionMouseOutHandler
  };
};

export default useProductsSearch;