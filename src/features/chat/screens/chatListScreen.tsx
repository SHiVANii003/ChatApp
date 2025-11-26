import React, { useCallback, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import Layout from "../../../components/layout/layout";
import ChatRow from "../components/chatRow";
import { Chat } from "../type";
import SAMPLE_CHATS from "../services/chatListData";


export default function ChatListScreen() {
    // keep data in state so we can mutate (mark read, reorder) for UI demo
    const [chats, setChats] = useState<Chat[]>(SAMPLE_CHATS);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // simulate network refresh
        setTimeout(() => {
            setChats((prev) => {
                if (prev.length === 0) return prev;
                const copy = prev.slice();
                // rotate list for visible change
                const first = copy.shift()!;
                copy.push(first);
                return copy;
            });
            setRefreshing(false);
        }, 800);
    }, []);

    const openChat = useCallback((item: Chat) => {
        console.log("Open chat:", item.id, item.name);
        // example: mark as read on open
        setChats((prev) => prev.map((c) => (c.id === item.id ? { ...c, unread: 0 } : c)));
    }, []);

    return (
        <Layout scrollable={false} stickyFooter={false}>
            {/* optional header is handled at App root — Layout just provides content area */}
            <View style={styles.container}>
                <FlatList
                    data={chats}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ChatRow
                            item={item}
                            onPress={() => openChat(item)}
                            onLongPress={() => console.log("Long press", item.id)}
                        />
                    )}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    contentContainerStyle={chats.length === 0 ? { flex: 1 } : { paddingBottom: 120 }}
                    ListEmptyComponent={<View style={styles.empty} />}
                />
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    empty: {
        flex: 1,
    },
});
