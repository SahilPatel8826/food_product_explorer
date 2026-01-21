export default function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search product name"
      className="border rounded px-3 py-2 w-52 text-sm"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
