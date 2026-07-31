import { LobbyItem } from "@/components/send/ContentSection";
import YouTubeEmbed from "@/components/send/subcomponents/YouTubeEmbed";
import getYouTubeLinks from "@/utils/helpers/send/getYouTubeLinks";
import Linkify from "linkify-react";

// Normal URLs with protocols, with additional common TLD with non-protocols.
const VALID_URL_REGEX =
  /(^https?:\/\/)|(.com|.net|.org|.edu|.gov|.int|.xyz|.ai|.me|.io|.th|.uk)/;

type MessageItemProps = {
  item: LobbyItem;
} & React.HTMLAttributes<HTMLDivElement>;

const MessageItem = ({ item, ...props }: MessageItemProps) => {
  const youtubeEmbedURLs = getYouTubeLinks(item.content);

  return (
    <div
      className="border-outline flex flex-row gap-3 rounded-md border p-3"
      {...props}
    >
      <p data-tabnum className="opacity-50">
        {new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date(item.created_at))}
      </p>
      <div className="w-full [&>*>a]:text-anchor">
        <Linkify
          as={"p"}
          options={{
            target: { url: "_blank" },
            validate: {
              url: (value) => VALID_URL_REGEX.test(value),
            },
            className: "break-all",
          }}
        >
          {item.content}
        </Linkify>
        {youtubeEmbedURLs.length > 0 && (
          <div
            className="mt-2 flex w-full flex-col gap-1 overflow-hidden
              rounded-md sm:flex-row sm:overflow-auto"
          >
            {youtubeEmbedURLs.map((link) => {
              return <YouTubeEmbed url={link.href} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
