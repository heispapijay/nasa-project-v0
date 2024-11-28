import { useState } from "react";
import { MediaAssets, searchAssets } from "../../services/api";
import { Filters } from "../../components/Filters/Filters";
import { ScaleLoader } from "react-spinners";
import { ItemCard } from "../../components/ItemCard/ItemCard";
import { Layout } from "./Layout";
import { PagePagination } from "./PagePagination";
import { SearchInput } from "./SearchInput";

const ITEMS_PER_PAGE = 6;

export const Home: React.FC = () => {
  const [results, setResults] = useState<MediaAssets[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<"image" | "video" | "audio">("image");
  const [hasSearched, setHasSearched] = useState(false); // New state to track search

  const handleSearch = async (query: string) => {
    setLoading(true);
    setHasSearched(true); // Mark as searched
    try {
      const assets = await searchAssets(query, filter);
      setResults(assets);
      setTotalPages(Math.ceil(assets.length / ITEMS_PER_PAGE));
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentResults = results.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilter: "image" | "video" | "audio") => {
    setFilter(newFilter);
  };

  return (
    <Layout
      pagination={
        results.length > 0 && (
          <PagePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )
      }
    >
      <div className="flex flex-col items-center">
        <SearchInput onSearch={handleSearch} />
        <Filters filter={filter} onFilterChange={handleFilterChange} />

        {loading ? (
          <div className="flex items-center justify-center w-full h-64">
            <ScaleLoader color={"#ffffff"} loading={loading} />
          </div>
        ) : hasSearched && results.length === 0 ? ( // Check only after search
          <div className="flex items-center justify-center w-full h-64">
            <p className="text-xl font-semibold text-gray-500">
              No results found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4 items-stretch">
            {currentResults.map((asset) => (
              <ItemCard key={asset.data[0].nasa_id} asset={asset} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};
