import { useQuery } from "react-query";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";

const categoriesURL = 'http://192.168.100.7:8000/api/categories';

const MainLayout = ({ children }) => {
  const categoriesQuery = useQuery('categories', async () => {
    try {
      const response = await axios.get(categoriesURL);

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  });

  return (!categoriesQuery.isLoading && !categoriesQuery.isError &&
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