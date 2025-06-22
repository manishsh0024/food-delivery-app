import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success') === "true";
  const orderId = searchParams.get('orderId');
  const { url,setCartItem } = useContext(StoreContext);
  const navigate = useNavigate();
  const hasRun = useRef(false);
  const [status, setStatus] = useState("verifying"); // 'verifying', 'failed'

  useEffect(() => {
    if (!orderId || hasRun.current) return;
    hasRun.current = true;

    const verifyPayment = async () => {
      try {
        const res = await axios.post(`${url}/api/order/verify`, { success, orderId });
        console.log("Verification response:", res.data);

        if (res.data.success) {
          setCartItem({})
          navigate("/myorder");
        } else {
          setStatus("failed");
        }
      } catch (err) {
        console.error("Verification failed:", err);
        setStatus("failed");
      }
    };

    verifyPayment();
  }, [orderId, success, navigate, setCartItem, url]);

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center bg-gray-50 px-4">
      {status === "verifying" ? (
        <>
          <div className="w-12 h-12 border-4 border-[#FF4C24] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Verifying your payment...</p>
        </>
      ) : (
        <>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">Payment Failed</h2>
            <p className="mt-2 text-gray-600">Your payment was unsuccessful or cancelled.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 px-6 py-2 bg-[#FF4C24] text-white rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Go to Home
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Verify;
