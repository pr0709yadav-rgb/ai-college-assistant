function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="w-full">

      <input
        type="text"
        placeholder="🔍 Search Subject..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
      />

    </div>
  );
}

export default SearchBar;