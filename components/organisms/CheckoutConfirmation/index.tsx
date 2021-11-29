import {
  CheckoutData,
  DataTopup,
  DetailVoucherTypes,
} from "@services/data-types";
import { setCheckout } from "@services/player";
import { NextRouter, useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

function CheckoutConfirmation() {
  const [confirm, setConfirm] = useState<boolean>(false);

  const router: NextRouter = useRouter();

  const onSubmit = async (): Promise<void> => {
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

    const reqData: CheckoutData = {
      voucher: dataItem._id,
      nominal: nominalItem._id,
      payment: paymentItem.payment._id,
      bank: paymentItem.bank._id,
      name: bankAccountName,
      accountUser: verifyID,
    };

    const { error, message } = await setCheckout(reqData);
    if (error) {
      toast.error(message);
      return;
    }

    router.push("/complete-checkout");
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
