import { useState } from "react";
import Modal from "react-modal";
import { toast } from "sonner";

Modal.setAppElement("#root");

const MockPaymentModal = ({
  isOpen,
  onRequestClose,
  amount,
  onPaymentSuccess,
}) => {
  const [message, setMessage] = useState("");

  const handleMockPayment = (event) => {
    event.preventDefault();
    const successMessage = `Mock payment succeeded for amount: $${amount}`;
    setMessage(successMessage);
    toast.success(successMessage);
    onPaymentSuccess();
    setTimeout(() => {
      onRequestClose();
    }, 3000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4">Stripe Mock Payment</h2>
        {message ? (
          <p className="text-green-600 font-semibold">{message}</p>
        ) : (
          <form onSubmit={handleMockPayment}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                defaultValue={"johndoe@gmail.com"}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                defaultValue={"password"}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Pay ${amount}
            </button>
          </form>
        )}
        <button
          onClick={onRequestClose}
          className="mt-4 w-full bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default MockPaymentModal;
