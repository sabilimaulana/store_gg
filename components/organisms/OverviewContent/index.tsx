import { getMemberOverview } from "@services/member";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Category from "./Category";
import TableRow from "./TableRow";

interface Count {
  _id: string;
  name: string;
  value: number;
}

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

function OverviewContent() {
  const [counts, setCounts] = useState<Count[]>([]);
  const [history, setHistory] = useState<HistoryTransaction[]>([]);

  const getMemberOverviewApi = useCallback(async (): Promise<void> => {
    const { error, message, data } = await getMemberOverview();
    if (error) {
      toast.error(message);
    }

    setCounts(data.count);
    setHistory(data.history);
  }, []);

  useEffect(() => {
    getMemberOverviewApi();
  }, []);

  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">Overview</h2>
        <div className="top-up-categories mb-30">
          <p className="text-lg fw-medium color-palette-1 mb-14">
            Top Up Categories
          </p>
          <div className="main-content">
            <div className="row">
              {counts.map((item) => (
                <Category icon="ic-desktop" nominal={item.value} key={item._id}>
                  Game
                  <br />
                  {item.name}
                </Category>
              ))}
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
                  <th className="text-start" scope="col">
                    Game
                  </th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <TableRow
                    title={item.historyVoucherTopup.gameName}
                    category={item.historyVoucherTopup.category}
                    item={`
                      ${item.historyVoucherTopup.coinQuantity}
                      ${item.historyVoucherTopup.coinName}`}
                    price={item.value}
                    status={item.status}
                    image={item.historyVoucherTopup.thumbnail}
                    key={item._id}
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

export default OverviewContent;
