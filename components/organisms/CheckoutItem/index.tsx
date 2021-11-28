import { DetailVoucherTypes } from "@services/data-types";
import { useEffect, useState } from "react";

function CheckoutItem() {
  const [dataItem, setDataItem] = useState<DetailVoucherTypes>({
    _id: "",
    name: "",
    status: "",
    category: { name: "", _id: "" },
    isFeatured: false,
    nominals: [],
    thumbnail: "",
    user: { _id: "", name: "", avatar: "", email: "", username: "" },
  });

  useEffect(() => {
    const dataItemLocal: DetailVoucherTypes = JSON.parse(
      localStorage.getItem("data-item") || "{}"
    );

    setDataItem(dataItemLocal);
  }, []);

  return (
    <div className="game-checkout d-flex flex-row align-items-center pt-md-50 pb-md-50 pt-30 pb-30">
      <div className="pe-4">
        <div className="cropped">
          {dataItem.thumbnail && (
            <img src={dataItem.thumbnail} className="img-fluid" alt="Game" />
          )}
        </div>
      </div>
      <div>
        <p className="fw-bold text-xl color-palette-1 mb-10">{dataItem.name}</p>
        <p className="color-palette-2 m-0">{`Category: ${dataItem.category.name}`}</p>
      </div>
    </div>
  );
}

export default CheckoutItem;
