import { DataTopup, DetailVoucherTypes } from "@services/data-types";
import { useState } from "react";
import { toast } from "react-toastify";

function CheckoutConfirmation() {
  const [confirm, setConfirm] = useState<boolean>(false);

  const onSubmit = (): void => {
    if (!confirm) {
      toast.error(
        "Silahkan klik pada checkbox jika anda telah mentransfer uangnya"
      );
      return;
    }

    const {
      nominalItem,
      paymentItem,
      bankAccountName,
      verifyID,
    }: DataTopup = JSON.parse(localStorage.getItem("data-topup") || "{}");

    const dataItem: DetailVoucherTypes = JSON.parse(
      localStorage.getItem("data-item") || "{}"
    );

    const data = {
      voucher: dataItem._id,
      nominal: nominalItem._id,
      payment: paymentItem.payment._id,
      bank: paymentItem.bank._id,
      name: bankAccountName,
      accountUser: verifyID,
    };

    console.log(data);
  };

  return (
    <>
      <label className="checkbox-label text-lg color-palette-1">
        I have transferred the money
        <input
          type="checkbox"
          checked={confirm}
          onChange={() => setConfirm((c) => !c)}
        />
        <span className="checkmark" />
      </label>
      <div className="d-md-block d-flex flex-column w-100 pt-50">
        <button
          className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg"
          type="button"
          onClick={onSubmit}
        >
          Confirm Payment
        </button>
      </div>
    </>
  );
}

export default CheckoutConfirmation;
