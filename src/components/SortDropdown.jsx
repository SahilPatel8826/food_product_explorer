export default function SortDropdown({ onSort }) {
  return (
    <select
      className="border rounded px-3 py-2 text-sm"
      onChange={(e) => onSort(e.target.value)}
    >
      <option value="">Sort</option>
      <option value="name-asc">Name A-Z</option>
      <option value="name-desc">Name Z-A</option>
      <option value="nutrition-asc">Nutrition A-E</option>
      <option value="nutrition-desc">Nutrition E-A</option>
    </select>
  );
}
