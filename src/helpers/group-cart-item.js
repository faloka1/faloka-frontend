const groupCartItem = (items) => {
  const uniqueBrand = items.reduce((prev, current) => {
    if (prev.includes(current.brand.slug)) {
      return prev;
    }

    return prev.concat(current.brand.slug);
  }, []);

  const grouped = uniqueBrand.map(brandSlug => {
    const selectedItem = items.find(item => item.brand.slug === brandSlug);
    const brandName = selectedItem.brand.name;
    const brandId = selectedItem.brand.id;
    const products = items.filter(item => item.brand.slug === brandSlug);

    return {
      name: brandName,
      slug: brandSlug,
      brand_id: brandId,
      items: products
    };
  });

  return grouped;
};

export default groupCartItem;