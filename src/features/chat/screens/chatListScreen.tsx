import React, { useCallback, useMemo, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import Header from "../../../components/layout/header";
import Layout from "../../../components/layout/layout";
import SearchBar from "../../../components/searchbar";
import ChatRow from "../components/chatRow";
import { Chat } from "../type";
import SAMPLE_CHATS from "../services/chatListData";


type Props = {
    onOpenChat?: (chat: Chat) => void;
};

export default function ChatListScreen({ onOpenChat }: Props) {
    const [chats, setChats] = useState<Chat[]>(SAMPLE_CHATS);
    const [refreshing, setRefreshing] = useState(false);
    const [query, setQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "groups">("all");

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setChats((prev) => {
                if (prev.length === 0) return prev;
                const copy = prev.slice();
                const first = copy.shift()!;
                copy.push(first);
                return copy;
            });
            setRefreshing(false);
        }, 800);
    }, []);

    const openChat = useCallback(
        (item: Chat) => {
            // mark read visually and call parent
            setChats((prev) => prev.map((c) => (c.id === item.id ? { ...c, unread: 0 } : c)));
            onOpenChat?.(item);
        },
        [onOpenChat]
    );

    // handle filter selection from SearchBar
    const handleFilterSelect = useCallback((id: string) => {
        if (id === "all" || id === "unread" || id === "groups") setActiveFilter(id);
    }, []);

    // compute filtered list from query + activeFilter
    const filteredChats = useMemo(() => {
        const q = query.trim().toLowerCase();
        let list = chats.slice();

        if (activeFilter === "unread") {
            list = list.filter((c) => (c.unread ?? 0) > 0);
        } else if (activeFilter === "groups") {
            list = list.filter((c) => !!c.isGroup || /group|team|\(g\)/i.test(c.name));
        }

        if (q.length > 0) {
            list = list.filter(
                (c) =>
                    c.name.toLowerCase().includes(q) ||
                    (c.lastMessage ?? "").toLowerCase().includes(q)
            );
        }

        return list;
    }, [chats, query, activeFilter]);

    return (
        <Layout
            header={<Header title="OneInbox" onMenuPress={() => console.log("menu")} />}
            scrollable={false}
            stickyFooter={false}
        >
            <View style={styles.container}>
                <SearchBar
                    value={query}
                    onChange={setQuery}
                    placeholder="Search chats"
                    onFilterSelect={handleFilterSelect}
                    showRightDot={false}
                />

                <FlatList
                    data={filteredChats}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ChatRow
                            item={item}
                            onPress={() => openChat(item)}
                            onLongPress={() => console.log("Long press", item.id)}
                        />
                    )}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    contentContainerStyle={filteredChats.length === 0 ? { flex: 1 } : { paddingBottom: 120 }}
                    ListEmptyComponent={<View style={styles.empty} />}
                />
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    empty: { flex: 1 },
});
