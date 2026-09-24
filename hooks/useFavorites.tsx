import useLocalStorageState from "use-local-storage-state";

export default function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useLocalStorageState<string[]>(
    "favorites",
    {
      defaultValue: [],
    },
  );

  function isFavorite(id: string): boolean {
    return favoriteIds.includes(id);
  }

  function toggleFavorite(id: string) {
    if (isFavorite(id)) {
      setFavoriteIds(favoriteIds.filter((favID) => favID !== id));
    } else {
      setFavoriteIds([...favoriteIds, id]);
    }
  }

  return { favoriteIds, isFavorite, toggleFavorite };
}
