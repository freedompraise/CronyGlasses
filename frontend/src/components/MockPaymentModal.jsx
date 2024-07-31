import Modal from "react-modal";

Modal.setAppElement("#root");

const MockPaymentModal = ({
  isOpen,
  onRequestClose,
  amount,
  onPaymentSuccess,
}) => {
  const handleMockPayment = (event) => {
    event.preventDefault();
    console.log("Mock payment succeeded for amount:", amount);
    onPaymentSuccess();
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Complete your mock payment</h2>
      <form onSubmit={handleMockPayment}>
        <div>
          <label>Name on Card</label>
          <input type="text" required className="border p-2 w-full" />
        </div>
        <div>
          <label>Card Details</label>
          <input type="text" required className="border p-2 w-full" />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Pay ${amount}
        </button>
      </form>
    </Modal>
  );
};

export default MockPaymentModal;
