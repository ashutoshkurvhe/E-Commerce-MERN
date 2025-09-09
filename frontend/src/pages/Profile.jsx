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
                  <div className="w-[80px] h-[80px] rounded-full shadow-lg p-6 flex items-center justify-center bg-gray-200 trext-black">
                      <h1 className="text-3xl">{Avatar}</h1>
                  </div>
                  <div>
                      
                      <p className="text-lg text-center text-gray-600 mb-4">{user?.email}</p>
                      <button onClick={handleLogout} className="w-full text-black py-2 px-4 rounded bg-red-300
                      ">Logout</button>
                      </div>
                  {/* Right section: order table */}
                  <div className="w-full md:w-2/3 lg:w-3/4 overflow-auto">
                  <MyOrderPage />          
                  </div>
              </div>
          </div>
      
    </div>
  )
}

export default Profile
