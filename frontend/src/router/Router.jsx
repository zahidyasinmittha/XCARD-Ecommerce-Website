import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from "../App";
import { Home, Login, Signup, ForgotPassword, UserProfilePage } from "../pages";
import { BasicInformation, ShippingAddress, PaymentOptions, Settings } from "../components";

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
        </Route>
    )
);

export default router;
