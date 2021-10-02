import { useContext } from "react";
import { useQuery } from "react-query";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import { HomeContext } from "../../context/HomeContext/HomeContext";

const homeURL = 'http://192.168.100.7:8000/api/home';

const MainLayout = ({ children }) => {
  const { setCategory, setHomeData } = useContext(HomeContext);
  const categoriesQuery = useQuery('home', async () => {
    try {
      const response = await axios.get(homeURL);
      const categories = response.data;

      setCategory(categories[0].slug);
      setHomeData(categories);

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