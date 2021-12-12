/* eslint-disable react/jsx-wrap-multilines */
import { HistoryTransaction } from "@services/data-types";
import NumberFormat from "react-number-format";
import Row from "./Row";

interface TransactionDetailContentProps {
  data: HistoryTransaction;
}

function TransactionDetailContent({ data }: TransactionDetailContentProps) {
  const {
    _id,
    historyVoucherTopup,
    status,
    historyPayment,
    value,
    tax,
    accountUser,
  } = data;

  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          {`Details ${_id}`}
        </h2>
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">Details</h2>
        <div className="details">
          <div className="main-content main-content-card overflow-auto">
            <section className="checkout mx-auto">
              <div className="d-flex flex-row  align-items-center justify-content-between mb-30">
                <div className="game-checkout d-flex flex-row align-items-center">
                  <div className="pe-4">
                    <div className="cropped">
                      <img
                        src={historyVoucherTopup.thumbnail}
                        width="200"
                        height="130"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                  <div>
                    <p className="fw-bold text-xl color-palette-1 mb-10">
                      {historyVoucherTopup.gameName}
                    </p>
                    <p className="color-palette-2 m-0">
                      {`Category: ${historyVoucherTopup.category}`}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="fw-medium text-center label pending m-0 rounded-pill">
                    {status}
                  </p>
                </div>
              </div>
              <hr />
              <div className="purchase pt-30">
                <h2 className="fw-bold text-xl color-palette-1 mb-20">
                  Purchase Details
                </h2>
                <Row label="Your Game ID" value={accountUser} />
                <Row label="Order ID" value={_id} />
                <Row
                  label="Item"
                  value={`${historyVoucherTopup.coinQuantity} ${historyVoucherTopup.coinName}`}
                />
                <Row
                  label="Price"
                  value={
                    <NumberFormat
                      value={historyVoucherTopup.price}
                      prefix="Rp. "
                      displayType="text"
                      thousandSeparator="."
                      decimalSeparator=","
                    />
                  }
                />
                <Row
                  label="Tax (10%)"
                  value={
                    <NumberFormat
                      value={tax}
                      prefix="Rp. "
                      displayType="text"
                      thousandSeparator="."
                      decimalSeparator=","
                    />
                  }
                />
                <Row
                  label="Total"
                  value={
                    <NumberFormat
                      value={value}
                      prefix="Rp. "
                      displayType="text"
                      thousandSeparator="."
                      decimalSeparator=","
                    />
                  }
                  className="color-palette-4"
                />
              </div>
              <div className="payment pt-10 pb-10">
                <h2 className="fw-bold text-xl color-palette-1 mb-20">
                  Payment Informations
                </h2>
                <Row label="Your Account Name" value={accountUser} />
                <Row label="Type" value={historyPayment.type} />
                <Row label="Bank Name" value={historyPayment.bankName} />
                <Row label="Bank Account Name" value={historyPayment.name} />
                <Row label="Bank Number" value={historyPayment.noRekening} />
              </div>
              <div className="d-md-block d-flex flex-column w-100">
                <a
                  className="btn btn-whatsapp rounded-pill fw-medium text-white border-0 text-lg"
                  href="/#"
                  role="button"
                >
                  WhatsApp ke Admin
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default TransactionDetailContent;
