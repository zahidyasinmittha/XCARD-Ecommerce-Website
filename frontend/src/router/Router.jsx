import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import {
  Home,
  Login,
  Signup,
  ForgotPassword,
  UserProfilePage,
  AdminPenalPage,
} from "../pages";
import {
  BasicInformation,
  ShippingAddress,
  PaymentOptions,
  Settings,
  BasicInfo,
  CreateNewProduct,
  DisplayAllProduct
} from "../components";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="userprofilepage" element={<UserProfilePage />}>
        <Route index element={<BasicInformation />} />
        <Route path="shippingaddress" element={<ShippingAddress />} />
        <Route path="paymentoptions" element={<PaymentOptions />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="adminpenalpage" element={<AdminPenalPage />}>
        <Route index element={<BasicInfo />} />
        <Route path="CreateNewProduct" element={<CreateNewProduct />} />
        <Route path="DisplayAllProduct" element={<DisplayAllProduct />} />
      </Route>
    </Route>
  )
);

export default router;
