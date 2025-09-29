import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { FaUser } from "react-icons/fa";
import { RiMenuSearchLine } from "react-icons/ri";
import { MdOutlineShoppingCart, MdFavoriteBorder } from "react-icons/md";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../../features/authSlice";
import GoogleLogout from "../../components/Login-method/GoogleLogout";
import TopbarInfo from "./topbar";
import { searchProducts } from "../../features/productSlice";
import BottomBar from "./bottombar";
import Logo from "./logo.svg";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Last Stock", href: "/last-stock" },
  { name: "Daily Special", href: "/daily-special" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const { totalCount } = useSelector((state) => state.cartReducer);
  const { totalFavCount } = useSelector((state) => state.favouriteReducer);
  const [profile, setProfile] = useState({});
  const { authUser } = useSelector((state) => state.authReducer);
  // import params
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setProfile(JSON.parse(localStorage.getItem("user")));
  }, [authUser, navigate]);

  const Logout = () => {
    dispatch(handleLogout()).then(() => {
      setProfile(JSON.parse(localStorage.getItem("user")));
      navigate("/login");
    });
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.trim();
    if (query === "") {
      return;
    }
    // Dispatch the search action
    dispatch(searchProducts(query));

    // Navigate to the search results page (you can use a dedicated search results page)
    navigate(`/search?query=${query}`);
  };

  return (
    <nav className=" shadow-lg sticky top-0 z-50">
      <TopbarInfo />
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 bg-primary">
          <div className="flex justify-between items-center h-16">
            {/* Left side: Brand */}
            <div className="flex items-center">
              <Link
                to="/"
                className="text-xl font-bold text-white flex items-center"
              >
                <img src={Logo} alt="Logo" className="h-8 w-8 mr-2" />
                <span className="sm:hidden md:block">Sagor Departmental</span>
                <span className="sm:block md:hidden">S.D Shop</span>
              </Link>
            </div>

            {/* Center: Search Bar */}
            <div className="flex-1 mx-10 bg-white flexCenter gap-2 rounded-lg px-1.5 py-1">
              <div className="border-r pr-3">
                <RiMenuSearchLine
                  className="cursor-pointer"
                  strokeWidth={0.1}
                  size={28}
                />
              </div>

              <div
                className={`flex-1 mx-4 px-4 sm:mx-0 ${
                  searchBarVisible ? "block" : "hidden"
                } sm:block`}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={handleSearchChange}
                  className="w-full focus:outline-none rounded-lg py-2"
                />
              </div>
            </div>

            {/* Right side: User Actions and Mobile Menu Button */}
            <div className="flex items-center">
              <div className="sm:hidden md:flex items-center">
                {profile && profile.isUser ? (
                  <>
                    {profile.admin && (
                      <Link
                        to="/dashboard/dash"
                        className="relative ml-4 text-background hover:text-gray-400"
                      >
                        Dashboard
                      </Link>
                    )}
                    <Link
                      to="/profile-user"
                      className="ml-4 text-background hover:text-secondary flex items-center"
                    >
                      <img
                        src={profile.img}
                        alt={profile.userName}
                        className="w-10 h-10 rounded-full mx-auto border-2 border-background p-0.5"
                      />
                    </Link>
                    <Link
                      onClick={Logout}
                      to="/"
                      className="ml-4 text-background hover:text-secondary"
                    >
                      <GoogleLogout />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="border-yellow-400 ml-4 rounded-xl px-2 py-1 text-black hover:text-secondary hover:bg-background flexCenter gap-2"
                    >
                      <FaUser size={28} color="white" />
                      <div className="text-sm -space-y-1">
                        <p className="font-semibold">Account</p>
                        <p>Login / Register</p>
                      </div>
                    </Link>
                  </>
                )}
                <Link
                  to="/cart"
                  className="relative ml-4 text-background hover:text-secondary"
                >
                  <MdOutlineShoppingCart color="black" className="text-xl" />
                  <span className="absolute top-[-8px] left-3 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-black bg-white rounded-full">
                    {totalCount}
                  </span>
                </Link>
                <Link
                  to="/favourite"
                  className="relative ml-4 text-background hover:text-secondary"
                >
                  <MdFavoriteBorder color="black" className="text-xl" />
                  <span className="absolute top-[-8px] left-3 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-black bg-white rounded-full">
                    {totalFavCount}
                  </span>
                </Link>
              </div>
              <button
                type="button"
                className="ml-4 text-background hover:text-gray-800 sm:flex md:hidden"
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  console.log(mobileMenuOpen);
                }}
              >
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <Dialog
          as="div"
          className=""
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)} // Ensure this properly closes the dialog
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto text-background bg-secondary px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <span className="text-background text-xl font-semibold">
                Sagor Departmental
              </span>
              <Link to="/" className="-m-1.5 p-1.5">
                <img src={Logo} alt="Logo" className="h-8 w-8 mr-2" />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-background"
                onClick={() => setMobileMenuOpen(false)} // Close when clicked
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    to="/profile-user"
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-background hover:bg-gray-400/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/cart"
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-background hover:bg-gray-400/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Cart ({totalCount})
                  </Link>
                  <Link
                    to="/favourite"
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-background hover:bg-gray-400/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Favourite ({totalFavCount})
                  </Link>

                  {profile && profile.isUser ? (
                    <>
                      {profile.admin && (
                        <Link
                          to="/dashboard/dash"
                          className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-background hover:bg-gray-400/10"
                        >
                          Dashboard
                        </Link>
                      )}

                      <Link
                        onClick={Logout}
                        to="/"
                        className="-mx-3  rounded-lg py-2 px-3 text-base font-semibold leading-7 text-background hover:bg-gray-400/10 flex"
                      >
                        Logout <GoogleLogout />
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/register"
                        className="border-yellow-400 ml-4 rounded-xl px-2 py-1 text-background hover:text-secondary hover:bg-background"
                      >
                        Register
                      </Link>
                      <Link
                        to="/login"
                        className="ml-4 border-1 text-primary bg-background hover:text-background rounded-xl px-2 py-1  hover:bg-secondary"
                      >
                        Login
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>

      <BottomBar />
    </nav>
  );
}
