import React, { useCallback, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Layout from "../../../components/layout/layout";
import { Chat } from "../type";
import ChatBubble from "../components/chatBubble";
import ChatFooter from "../components/chatFooter";
import ChatHeader from "../components/chatHeader";
import ContactDrawer from "../components/contactDrawer";

type Props = {
    chat: Chat;
    onBack: () => void;
};

type Message = { id: string; text: string; isMine?: boolean; time?: string };

export default function ChatScreen({ chat, onBack }: Props) {
    // seed messages (demo)
    const [messages, setMessages] = useState<Message[]>([
        { id: "m1", text: "Hey! How are you?", isMine: false, time: "09:10" },
        { id: "m2", text: "I'm good — working on the UI.", isMine: true, time: "09:12" },
        { id: "m3", text: chat.lastMessage, isMine: false, time: chat.time },
    ]);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const send = useCallback((text: string) => {
        const m: Message = { id: String(Date.now()), text, isMine: true, time: "Now" };
        setMessages((prev) => [...prev, m]);
    }, []);

    return (
        <Layout
            header={<ChatHeader name={chat.name} avatarUrl={chat.avatarUrl} onBack={onBack} onOpenDetails={() => setDrawerOpen(true)} />}
            scrollable={false}
            stickyFooter
            footer={<ChatFooter onSend={send} />}
        >
            <View style={styles.container}>
                <FlatList
                    data={messages}
                    keyExtractor={(m) => m.id}
                    renderItem={({ item }) => <ChatBubble text={item.text} time={item.time} isMine={item.isMine} />}
                    contentContainerStyle={{ paddingVertical: 8 }}
                />
            </View>

            <ContactDrawer
                visible={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                contact={{ name: chat.name, phone: "99999 00000", about: "Hey, I am using OneInbox." }}
            />
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
});
