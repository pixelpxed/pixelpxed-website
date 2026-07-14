import { LobbyItem } from "@/components/send/ContentSection";

const groupLobbyItems = (
  items: LobbyItem[],
): Array<{ groupDate: string; items: LobbyItem[] }> => {
  const grouped: Record<string, LobbyItem[]> = {};

  for (let i = 0; i < items.length; i++) {
    const date = items[i].created_at.split("T")[0];
    if (grouped[date] == null) grouped[date] = [];
    grouped[date].push(items[i]);
  }

  return Object.entries(grouped)
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([groupDate, groupedItems]) => ({
      groupDate,
      items: groupedItems,
    }));
};

export default groupLobbyItems;
