function togglePaymentOption() {
  const paymentRadios = document.getElementsByName("payment");
  const orderButton = document.querySelector("#placeOrderButton");

  orderButton.addEventListener("click", () => {
    const selectedRadio = Array.from(paymentRadios).find(
      (radio) => radio.checked
    );

    if (selectedRadio) {
      window.location.href = selectedRadio.value;
    }
  });
}

document.addEventListener("DOMContentLoaded", togglePaymentOption);
