import { useState } from "react";
import { logo } from "../assest";
import { FaSearch, FaHandsHelping, FaRegUserCircle } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { FiInbox } from "react-icons/fi";
import { GoSignOut } from "react-icons/go";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { logoutUser } from "../redux/slice/userSlice";
import { RiAdminFill } from "react-icons/ri";


function Header() {
  const userDetail = useSelector((state) => state.userDetail.userDetail);
  const [isSearchManuOpen, setIsSearchManuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const handleToggleMenu = () => {
    setIsSearchManuOpen((prevState) => !prevState);
  };
  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleIsProfileMenuOpen = (e) => {
    setIsProfileMenuOpen((prevState) => !prevState);
  };
  const logoutuser = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="shadow-md font-[sans-serif] tracking-wide relative z-50">
      <section className="flex justify-center items-center relative py-3 lg:px-10 max-sm:pr-2 px-4 border-gray-200 border-b bg-white lg:min-h-[80px] max-lg:min-h-[60px]">
        <Link to="/" className="max-sm:w-full max-sm:mb-1.5 ">
          <img src={logo} alt="logo" className="max-sm:w-32 w-40" />
        </Link>

        <div className="flex justify-center flex-wrap w-full items-center">
          <div className="ml-auto">
            <ul className="flex justify-center items-center">
              <li className="flex justify-center text-[15px] max-lg:py-2 max-sm:px-1 px-2.5 cursor-pointer">
                <div className="flex items-center mt-1.5">
                  <div className="relative">
                    <button
                      onClick={handleToggleMenu}
                      className="focus:outline-none"
                    >
                      <FaSearch className="text-xl" />
                    </button>
                    <input
                      type="text"
                      placeholder="Search something..."
                      value={searchValue}
                      onChange={handleSearchInputChange}
                      className={`z-20 absolute lg:-top-2 max-sm:right-8 right-10 xl:w-96 max-sm:w-48 max-lg:w-full lg:ml-10 max-md:mt-4 max-lg:ml-4 bg-gray-100
                       focus:bg-transparent px-6 rounded h-11 outline-[#333] text-sm transition-all ${
                         isSearchManuOpen ? "block" : "hidden"
                       }`}
                    />
                  </div>
                </div>
              </li>
              <li className="max-lg:py-2 px-2.5 cursor-pointer">
                <span className="relative">
                  <TiShoppingCart className="text-3xl" />
                  <span className="absolute left-6 -ml-1 -top-1 rounded-full bg-red-500 px-1 py-0 text-xs text-white">
                    0
                  </span>
                </span>
              </li>
              { userDetail?.success &&
                <li className=" flex text-[15px] max-lg:py-2 px-2.5 font-medium text-[#333] cursor-pointer">
                  {!userDetail?.data?.ProfileImage && (
                    <FaRegUserCircle
                      className="text-3xl relative inline-block cursor-pointer rounded-full object-cover object-center"
                      data-popover-target="profile-menu"
                      onClick={handleIsProfileMenuOpen}
                      onMouseEnter={handleIsProfileMenuOpen}
                    />
                  )}
                  {userDetail?.data?.ProfileImage && (
                    <img
                      src={userDetail?.data?.ProfileImage}
                      className="h-12 w-12 relative inline-block cursor-pointer rounded-full object-fit object-center"
                      data-popover-target="profile-menu"
                      onClick={handleIsProfileMenuOpen}
                      onMouseEnter={handleIsProfileMenuOpen}
                    />
                  )}
                  {isProfileMenuOpen && (
                    <ul
                      onMouseLeave={handleIsProfileMenuOpen}
                      role="menu"
                      data-popover="profile-menu"
                      data-popover-placement="bottom"
                      className="absolute top-20 right-2 z-10 flex min-w-[180px] flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
                    >
                      <button
                        tabIndex="-1"
                        role="menuitem"
                        className="hover:text-[#f29221] active:text-red-600 flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                      >
                        <FaRegUserCircle className=" text-base" />
                        <Link to="/userProfilePage"  className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                          My Profile
                        </Link>
                      </button>
                     {userDetail?.data?.role ==="seller" ?<button
                        tabIndex="-1"
                        role="menuitem"
                        className="hover:text-[#f29221] active:text-red-600 flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                      >
                        <RiAdminFill className=" text-base font-extrabold" />
                        <Link to="adminpenalpage" className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                          Admin Penel
                        </Link>
                      </button>: ""}
                      <button
                        tabIndex="-1"
                        role="menuitem"
                        className="hover:text-[#f29221] active:text-red-600 flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                      >
                        <FiInbox className=" text-base font-bold" />
                        <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                          Inbox
                        </p>
                      </button>
                      <button
                        tabIndex="-1"
                        role="menuitem"
                        className="hover:text-[#f29221] active:text-red-600 flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                      >
                        <FaHandsHelping className=" text-base" />
                        <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                          Help
                        </p>
                      </button>
                      <hr
                        className="my-2 border-blue-gray-50"
                        tabIndex="-1"
                        role="menuitem"
                      />
                      <button
                        onClick={logoutuser}
                        tabIndex="-1"
                        role="menuihover:text-[#f29221] active:text-red-600 tem"
                        className="hover:text-[#f29221] active:text-red-600 flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                      >
                        <GoSignOut className=" text-lg font-extrabold" />
                        <p className=" block font-sans text-sm font-normal leading-normal text-inherit antialiased">
                          Sign Out
                        </p>
                      </button>
                    </ul>
                  )}{" "}
                </li>
              }
              {!userDetail?.data && (
                <li className="flex text-[15px] max-lg:py-2 px-3">
                  <Link to="/login">
                    <button className=" hover:text-white px-4 py-2 max-md:px- max-sm:w-20 max-md:py-1.5 text-sm rounded-xl md:font-semibold text-black bg-[#f29221]">
                      Sign In
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>
    </header>
  );
}

export default Header;
