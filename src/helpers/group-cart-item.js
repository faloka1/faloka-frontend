const groupCartItem = (items) => {
  const uniqueBrand = items.reduce((prev, current) => {
    if (prev.includes(current.brand.slug)) {
      return prev;
    }

    return prev.concat(current.brand.slug);
  }, []);

  const grouped = uniqueBrand.map(b => {
    const brandName = items.find(item => item.brand.slug === b).brand.name;
    const products = items.filter(item => item.brand.slug === b);

    return {
      name: brandName,
      slug: b,
      items: products
    };
  });

  return grouped;
};

export default groupCartItem;