import { DataTopup, UserTypes } from "@services/data-types";
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";

interface CheckoutDetailProps {
  user: UserTypes;
}

function CheckoutDetail({ user }: CheckoutDetailProps) {
  const [dataTopup, setDataTopup] = useState<DataTopup>({
    verifyID: "",
    bankAccountName: "",
    nominalItem: { coinName: "", coinQuantity: 0, _id: "", price: 0 },
    paymentItem: {
      bank: { _id: "", bankName: "", name: "", noRekening: "" },
      payment: { _id: "", banks: [], status: "", type: "" },
    },
  });

  useEffect(() => {
    const dataTopupLocal: DataTopup = JSON.parse(
      localStorage.getItem("data-topup") || "{}"
    );

    setDataTopup(dataTopupLocal);
  }, []);

  const voucherPrice = dataTopup.nominalItem.price;
  const tax = (voucherPrice * 10) / 100;
  const total = voucherPrice + tax;

  return (
    <>
      <div className="purchase pt-md-50 pt-30">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">
          Purchase Details
        </h2>
        <p className="text-lg color-palette-1 mb-20">
          Your Game ID
          <span className="purchase-details">{dataTopup.verifyID}</span>
        </p>
        {/* <p className="text-lg color-palette-1 mb-20">
          Order ID
          <span className="purchase-details">#GG001</span>
        </p> */}
        <p className="text-lg color-palette-1 mb-20">
          Item
          <span className="purchase-details">{`${dataTopup.nominalItem.coinQuantity} ${dataTopup.nominalItem.coinName}`}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Price
          <span className="purchase-details">
            <NumberFormat
              value={voucherPrice}
              prefix="Rp. "
              displayType="text"
              thousandSeparator="."
              decimalSeparator=","
            />
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Tax (10%)
          <span className="purchase-details">
            <NumberFormat
              value={tax}
              prefix="Rp. "
              displayType="text"
              thousandSeparator="."
              decimalSeparator=","
            />
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Total
          <span className="purchase-details color-palette-4">
            <NumberFormat
              value={total}
              prefix="Rp. "
              displayType="text"
              thousandSeparator="."
              decimalSeparator=","
            />
          </span>
        </p>
      </div>
      <div className="payment pt-md-50 pb-md-50 pt-10 pb-10">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">
          Payment Informations
        </h2>
        <p className="text-lg color-palette-1 mb-20">
          Your Account Name
          <span className="purchase-details">{user.name}</span>
        </p>
        {/* <p className="text-lg color-palette-1 mb-20">
          Type
          <span className="payment-details">Worldwide Transfer</span>
        </p> */}
        <p className="text-lg color-palette-1 mb-20">
          Bank Name
          <span className="payment-details">
            {dataTopup.paymentItem.bank.bankName}
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Bank Account Name
          <span className="payment-details">
            {dataTopup.paymentItem.bank.name}
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Bank Number
          <span className="payment-details">
            {dataTopup.paymentItem.bank.noRekening}
          </span>
        </p>
      </div>
    </>
  );
}

export default CheckoutDetail;
