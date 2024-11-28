import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AssetDetails, getAssetDetails } from "../../services/api";
import { ScaleLoader } from "react-spinners";
import { Button } from "../../components/Button/Button";

export const SingleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [asset, setAsset] = useState<AssetDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssetDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAssetDetails(id as string);
        setAsset(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load asset details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAssetDetails();
    }
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ScaleLoader color={"#ffffff"} loading={loading} />
      </div>
    );
  if (error) return <p>{error}</p>;
  if (!asset) return <p>No asset found.</p>;

  // select primary media based on media type
  const primaryMedia =
    asset.media_type === "video"
      ? asset.mediaUrls.find((url) => url.endsWith(".mp4")) // first video found from URL
      : asset.media_type === "audio"
      ? asset.mediaUrls.find((url) => /\.(mp3|wav)$/i.test(url)) // first audio from URL
      : asset.mediaUrls.find((url) => /\.(jpg|jpeg|png)$/i.test(url)); // first image from URL

  // display full description if it's too long or show a truncated version of it
  const isLongDescription = asset.description.length > 200;
  const displayDescription = isLongDescription
    ? showFullDescription
      ? asset.description
      : `${asset.description.substring(0, 400)}...`
    : asset.description;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">
      <div className="w-full flex items-start justify-start mb-4">
        <Button onClick={() => navigate(-1)} text="Back" isActive />
      </div>

      {/* Asset Details */}
      <div className="flex flex-col items-center max-w-[1280px]">
        <h1 className="text-2xl font-bold">{asset.title}</h1>
        <p className="mt-2 text-gray-200 text-justify">
          {displayDescription}
          {isLongDescription && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-white ml-2 hover:underline"
            >
              {showFullDescription ? "Read Less" : "Read More"}
            </button>
          )}
        </p>

        <div className="mt-4">
          {asset.media_type === "video" && primaryMedia ? (
            <video
              src={primaryMedia}
              poster={asset.thumbnail}
              controls
              className="w-auto h-72 object-contain rounded p-4 border-2 border-black custom-shadow bg-white"
            />
          ) : asset.media_type === "audio" && primaryMedia ? (
            <audio
              src={primaryMedia}
              controls
              className="lg:w-[30vw] mt-4 bg-white"
            >
              Your browser does not support the audio element.
            </audio>
          ) : primaryMedia ? (
            <img
              src={primaryMedia}
              alt={asset.title}
              className="w-auto h-72 object-contain rounded p-4 border-2 border-black custom-shadow bg-white"
            />
          ) : (
            <p>No asset for this.</p>
          )}
        </div>
      </div>
    </div>
  );
};
