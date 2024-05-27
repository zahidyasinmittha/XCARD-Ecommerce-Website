import { Outlet } from 'react-router-dom'
import { Footer, Header } from './components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './redux/slice/userSlice';



function App() {
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetail);

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])
  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    <ToastContainer closeOnClick />
    </>
  )
}

export default App
