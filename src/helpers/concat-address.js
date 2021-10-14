const concatAddress = (address) => {
  const {
    districts,
    location,
    sub_district,
    provinces,
    postal_code
  } = address;

  return `${location}, ${sub_district}, ${districts.title}, ${provinces.title}, ${postal_code}`;
};

export default concatAddress;