import { LobbyItem } from "@/components/send/ContentSection";
import Linkify from "linkify-react";

// Normal URLs with protocols, with additional common TLD with non-protocols.
const VALID_URL_REGEX =
  /(^https?:\/\/)|(.com|.net|.org|.edu|.gov|.int|.xyz|.ai|.me|.io|.th|.uk)/;

type MessageItemProps = {
  item: LobbyItem;
} & React.HTMLAttributes<HTMLDivElement>;

const MessageItem = ({ item, ...props }: MessageItemProps) => {
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
      <div className="[&>*>a]:text-blue-500 dark:[&>*>a]:text-blue-400">
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
      </div>
    </div>
  );
};

export default MessageItem;
