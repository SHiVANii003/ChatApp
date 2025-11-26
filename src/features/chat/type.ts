export type Chat = {
    id: string;
    name: string;
    lastMessage: string;
    time: string;
    unread?: number;
    avatarUrl?: string;
    isGroup?: boolean;
    isPinned?: boolean;
    isMuted?: boolean;
};
