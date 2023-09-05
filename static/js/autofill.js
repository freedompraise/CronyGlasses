function togglePaymentOption() {
  const paymentRadios = document.getElementsByName("payment");

  paymentRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.checked) {
        window.location.href = radio.value;
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", togglePaymentOption);
