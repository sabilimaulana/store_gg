import { getMemberTransactions } from "@services/member";
import { useCallback, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import ButtonTab from "./ButtonTab";
import TableRow from "./TableRow";

interface HistoryVoucherTopup {
  gameName: string;
  category: string;
  coinQuantity: string;
  coinName: string;
  thumbnail: string;
}

interface HistoryTransaction {
  _id: string;
  historyVoucherTopup: HistoryVoucherTopup;
  status: string;
  value: number;
}

function TransactionsContent() {
  const [total, setTotal] = useState(0);
  const [transactions, setTransactions] = useState<HistoryTransaction[]>([]);
  const [tab, setTab] = useState("all");

  const getMemberTransactionsApi = useCallback(async (value: string) => {
    const { data, error, message } = await getMemberTransactions(value);
    if (error) {
      toast.error(message);
      return;
    }

    setTotal(data.total);
    setTransactions(data.history);
  }, []);

  useEffect(() => {
    getMemberTransactionsApi("all");
  }, []);

  const onTabClick = async (value: string) => {
    setTab(value);

    getMemberTransactionsApi(value);
  };

  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          My Transactions
        </h2>
        <div className="mb-30">
          <p className="text-lg color-palette-2 mb-12">You’ve spent</p>
          <h3 className="text-5xl fw-medium color-palette-1">
            <NumberFormat
              value={total}
              prefix="Rp. "
              displayType="text"
              thousandSeparator="."
              decimalSeparator=","
            />
          </h3>
        </div>
        <div className="row mt-30 mb-20">
          <div className="col-lg-12 col-12 main-content">
            <div id="list_status_title">
              <ButtonTab
                title="All Trx"
                active={tab === "all"}
                onClick={() => onTabClick("all")}
              />
              <ButtonTab
                title="Success"
                active={tab === "success"}
                onClick={() => onTabClick("success")}
              />
              <ButtonTab
                title="Pending"
                active={tab === "pending"}
                onClick={() => onTabClick("pending")}
              />
              <ButtonTab
                title="Failed"
                active={tab === "failed"}
                onClick={() => onTabClick("failed")}
              />
            </div>
          </div>
        </div>
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">
            Latest Transactions
          </p>
          <div className="main-content main-content-table overflow-auto">
            <table className="table table-borderless">
              <thead>
                <tr className="color-palette-1">
                  <th className="" scope="col">
                    Game
                  </th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list_status_item">
                {transactions.map((transaction) => (
                  <TableRow
                    id={transaction._id}
                    title={transaction.historyVoucherTopup.gameName}
                    category={transaction.historyVoucherTopup.category}
                    item={`
                      ${transaction.historyVoucherTopup.coinQuantity}
                      ${transaction.historyVoucherTopup.coinName}`}
                    price={transaction.value}
                    status={transaction.status}
                    image={transaction.historyVoucherTopup.thumbnail}
                    key={transaction._id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default TransactionsContent;
