import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/slice/userSlice";
import { fetchStore } from "./redux/slice/storeSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [fetchUser]);
  useEffect(() => {
    dispatch(fetchStore());
  }, [fetchStore]);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer closeOnClick />
    </>
  );
}

export default App;
