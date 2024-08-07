import { useOrderHistory } from "../contexts/OrderHistoryContext";
import { useEffect } from "react";

function Account() {
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!userEmail) {
      window.location.href = "/login";
    }
  }, [userEmail]);

  const Name = userEmail ? userEmail.slice(0, userEmail.indexOf("@")) : "";
  const Email = userEmail || "";
  const { orderHistory } = useOrderHistory();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (!userEmail) {
    return null; // Prevents rendering if userEmail is null, the useEffect will redirect to login
  }

  return (
    <div className="bg-white p-4 sm:p-8 mx-auto max-w-6xl my-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-gray-800 font-semibold tracking-wide uppercase">
          ACCOUNT DETAILS
        </h2>
        <button
          onClick={handleLogout}
          className="bg-gray-800 hover:bg-black text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <hr className="w-full mb-4" />
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col w-full md:w-1/2 mb-4 md:mb-0">
          <h3 className="text-lg font-bold mb-2">Personal Information</h3>
          <p className="mb-2">
            <span className="font-bold">Name:</span> {Name}
          </p>
          <p className="mb-2">
            <span className="font-bold">Email:</span> {Email}
          </p>
          <p className="mb-2">
            <span className="font-bold">Phone:</span> +1 (555) 555-1234
          </p>
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <h3 className="text-lg font-bold mb-2">Order History</h3>
          <ul>
            {orderHistory.length > 0 ? (
              orderHistory.map((order) => (
                <li className="mb-2" key={order.orderId}>
                  <span className="font-bold">Order #:</span> {order.orderId}
                  <br />
                  <span className="font-bold">Amount:</span> ${order.amount}
                  <br />
                  <span className="font-bold">Date:</span> {order.date}
                </li>
              ))
            ) : (
              <li className="mb-2">No orders yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Account;
