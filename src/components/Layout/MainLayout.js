import { useContext } from "react";
import { useQuery } from "react-query";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import { HomeContext } from "../../context/HomeContext/HomeContext";

const categoriesURL = 'http://192.168.100.7:8000/api/categories';

const MainLayout = ({ children }) => {
  const { setCategory } = useContext(HomeContext);
  const categoriesQuery = useQuery('categories', async () => {
    try {
      const response = await axios.get(categoriesURL);
      const categories = response.data;

      console.log(categories);

      setCategory(categories[0].slug);

      return categories;
    } catch (error) {
      console.log(error);
    }
  });

  return (!categoriesQuery.isLoading &&
    <>
      <Navbar categories={categoriesQuery.data} />
      <main className="main">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;