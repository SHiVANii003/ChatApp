import React, { useState } from "react";
import { FlatList } from "react-native";
import Header from "../../../components/layout/header";
import Layout from "../../../components/layout/layout";
import SearchBar from "../../../components/searchbar";
import ChatRow, { ChatItemType } from "../components/chatRow";


export default function ChatListScreen() {
    const [search, setSearch] = useState("");

    const chats: ChatItemType[] = [
        { id: "1", name: "Shivani Prajapati", lastMessage: "Hey! What's up?", time: "09:22", unread: 2 },
        { id: "2", name: "Mom", lastMessage: "Come home early.", time: "Yesterday" },
        { id: "3", name: "Project Team", lastMessage: "Meeting moved to 4 PM.", time: "Sun" },
        { id: "4", name: "Aman", lastMessage: "I'll call tonight.", time: "08:12" },
    ];

    const filtered = chats.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) || c.lastMessage.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Layout header={<Header title="OneInbox" />} scrollable={false} stickyFooter={false}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search chats" />

            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ChatRow item={item} onPress={() => console.log("Open", item.name)} />}
            />
        </Layout>
    );
}
