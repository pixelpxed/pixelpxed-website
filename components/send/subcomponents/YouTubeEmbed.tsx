import getYouTubeID from "get-youtube-id";

type YouTubeEmbedTypes = {
  url: string;
};

const YouTubeEmbed = ({ url }: YouTubeEmbedTypes) => {
  return (
    <>
      <iframe
        src={`https://www.youtube.com/embed/${getYouTubeID(url)}`}
        className="border-outline aspect-video w-full max-w-sm overflow-hidden
          rounded-md border"
      />
    </>
  );
};

export default YouTubeEmbed;
