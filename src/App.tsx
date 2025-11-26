import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import Header from "./components/layout/header";
import Drawer from "./components/drawer";
import SearchBar from "./components/searchbar";
import ChatListScreen from "./features/chat/screens/chatListScreen";


export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [q, setQ] = useState("");


  const drawerItems = [
    { id: "inbox", label: "Inbox", icon: "inbox", onPress: () => console.log("Inbox") },
    { id: "starred", label: "Starred", icon: "star-outline", onPress: () => console.log("Starred") },
    { id: "settings", label: "Settings", icon: "cog-outline", onPress: () => console.log("Settings") },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Header onAction={(id) => console.log("menu action:", id)} />
      <SearchBar
        value={q}
        onChange={setQ}
        placeholder="Search by name"
        onFilterSelect={(id) => console.log("filter selected", id)}
      />

      <ChatListScreen />

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} items={drawerItems} />
      {/* <FilterModal visible={filterOpen} onClose={closeFilter} /> */}
    </SafeAreaView>
  );
}
