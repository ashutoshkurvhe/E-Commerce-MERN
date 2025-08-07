import MyOrderPage from "./MyOrderPage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logout} from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/CartSlice";
const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);
        
    
    const Avatar = user?.name?.charAt(0).toUpperCase() || "U";

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        navigate("/login");
    };

  return (
      <div className="min-h-screen flex flex-col bg-white">
          <div className="flex-grow container mx-auto p-4 md:p-6">
              <div className="flex items-center flex-col md:space-x-6 space-y-6 md:space-y-0">
                  {/* Left Section */}
                  <div className="w-full md:w-1/3 lg:w-1/4 rounded-lg p-6">
                      <h1 className="bg-gray-100 text-2xl text-center md:text-3xl font-bold md:pt-5 shadow-xl rounded-full w-20 h-20 m-auto mb-4">{Avatar}</h1>
                      <p className="text-lg text-center text-gray-600 mb-4">{user?.email}</p>
                      <button onClick={handleLogout} className="w-full border-1 border-gray-500 text-black py-2 px-4 rounded hover:bg-red-600
                      ">Logout</button>
                  </div>
                  {/* Right section: order table */}
                  <div className="w-full md:w-2/3 lg:w-3/4">
                  <MyOrderPage />          
                  </div>
              </div>
          </div>
      
    </div>
  )
}

export default Profile
