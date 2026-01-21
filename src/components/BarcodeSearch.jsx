import { useNavigate } from "react-router-dom";

export default function BarcodeSearch() {
  const navigate = useNavigate();

  return (
    <input
      type="text"
      placeholder="Search by barcode"
      className="border rounded px-3 py-2 w-52 text-sm"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          navigate(`/product/${e.target.value}`);
        }
      }}
    />
  );
}

