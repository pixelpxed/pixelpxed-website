import { LobbyItem } from "@/components/send/ContentSection";
import MessageItem from "@/components/send/subcomponents/MessageItem";

type MessageGroupProps = {
  group: {
    groupDate: string;
    items: LobbyItem[];
  };
} & React.HTMLAttributes<HTMLDivElement>;

const MessageGroup = ({ group, ...props }: MessageGroupProps) => {
  return (
    <div className="not-last:mb-6" {...props}>
      <div className="mb-2 flex items-center gap-2">
        <p className="text-xs opacity-50">
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "long",
          }).format(new Date(group.groupDate))}
        </p>
        <div className="border-outline grow border-t"></div>
      </div>
      <div className="flex flex-col gap-1">
        {group.items.map((i, idx) => {
          return <MessageItem item={i} key={idx} />;
        })}
      </div>
    </div>
  );
};

export default MessageGroup;
