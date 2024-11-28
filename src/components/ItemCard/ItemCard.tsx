import { Link } from "react-router-dom";
import { MediaAssets } from "../../services/api";

interface ItemCardProps {
  asset: MediaAssets;
}

export const ItemCard: React.FC<ItemCardProps> = ({ asset }) => {
  const thumbnail = asset.links?.[0]?.href || "/logo-removebg-preview.png";
  const title = asset.data[0]?.title;
  const nasaId = asset.data[0]?.nasa_id;
  const mediaType = asset.data[0]?.media_type || "unknown";

  return (
    <Link to={`/asset/${nasaId}`} key={nasaId} className="flex flex-col h-full">
      <div className="relative border-2 border-black rounded p-2 custom-shadow transition bg-white flex flex-col h-full">
        <span className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
          {mediaType.toUpperCase()}
        </span>
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover rounded border-black border-2"
        />
        <div className="flex-1 flex items-center mt-2">
          <h2 className="text-base font-semibold truncate text-black">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
};
