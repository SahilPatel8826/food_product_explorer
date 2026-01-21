export default function CategoryFilter({ categories, onChange }) {
  return (
    <select
      className="border rounded px-3 py-2 text-sm"
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}
