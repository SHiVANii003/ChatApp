import React, { useState } from "react";
import ChatListScreen from "./features/chat/screens/chatListScreen";
import { Chat } from "./features/chat/type";
import ChatScreen from "./features/chat/screens/chatScreen";


export default function App() {
  const [selected, setSelected] = useState<Chat | null>(null);

  return selected ? (
    <ChatScreen chat={selected} onBack={() => setSelected(null)} />
  ) : (
    <ChatListScreen onOpenChat={(c: Chat) => setSelected(c)} />
  );
}
