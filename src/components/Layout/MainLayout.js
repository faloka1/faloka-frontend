import { useContext } from "react";
import { useQuery } from "react-query";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { HomeContext } from "../../context/HomeContext/HomeContext";
import getHomeData from "../../helpers/api/get-home-data";

const MainLayout = ({ children }) => {
  const { setCategory, setHomeData } = useContext(HomeContext);
  const categoriesQuery = useQuery('home', async () => {
    try {
      const response = await getHomeData();
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