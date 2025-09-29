import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Searching from "../../components/Preloaders/Searching";
import { toast } from "react-toastify";
import { getProductBySlug } from "../../features/productSlice";

const SearchPage = () => {
  const notify = (msg) => toast(msg);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchResults, isLoading } = useSelector(
    (state) => state.productsReducer
  );

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery().get("query");

  if (!searchResults || searchResults.length === 0)
    return <p>No products found</p>;

  return (
    <div className="container mx-auto relative h-[90vh] overflow-y-scroll my-4">
      {" "}
      {/* Main wrapper */}
      <h1 className="text-2xl font-semibold mb-4">
        Search Results for "{query}"
      </h1>
      {isLoading && <Searching />}
      <div className="absolute w-full bg-white shadow-lg rounded-lg z-10 mt-2">
        <ul className="flex flex-col p-4 space-y-4">
          {searchResults.map((product) => (
            <li
              key={product._id}
              onClick={() => {
                dispatch(getProductBySlug(product.slug));
                navigate("/current-product");
              }}
              className="flex items-center border p-4 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-md flex-shrink-0 mr-4"
              />

              {/* Product Details */}
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-500">{product.description}</p>
                <p className="text-green-600 font-bold mt-1">
                  Price: ${product.price}
                </p>
              </div>

              {/* Extra Info */}
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  In Stock: {product.quantity}
                </p>
                <p className="text-sm text-gray-500">Sold: {product.sold}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;
