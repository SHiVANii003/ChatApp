import { Chat } from "../type";

const SAMPLE_CHATS: Chat[] = [
    {
        id: "1",
        name: "Aarav Sharma",
        lastMessage: "Bro are we meeting today?",
        time: "10:15 AM",
        unread: 3,
    },
    {
        id: "2",
        name: "Mom ❤️",
        lastMessage: "Beta did you eat?",
        time: "09:02 AM",
    },
    {
        id: "3",
        name: "UI/UX Squad",
        lastMessage: "New design file is ready → check Figma",
        time: "Yesterday",
        isGroup: true,
        unread: 1,
    },
    {
        id: "4",
        name: "Ritika",
        lastMessage: "Listen I need help 😂",
        time: "8:42 AM",
        unread: 2,
    },
    {
        id: "5",
        name: "Work Team",
        lastMessage: "Standup in 5 mins!",
        time: "Yesterday",
        isGroup: true,
    },
    {
        id: "6",
        name: "Ananya",
        lastMessage: "Sent you the notes!",
        time: "Sun",
    },
    {
        id: "7",
        name: "Dad",
        lastMessage: "Call me when free.",
        time: "Sat",
    },
    {
        id: "8",
        name: "Fitness Group 🏋️‍♀️",
        lastMessage: "Tomorrow 7 AM walk?",
        time: "Fri",
        unread: 5,
        isGroup: true,
    },
    {
        id: "9",
        name: "Kabir",
        lastMessage: "Okay cool 👍",
        time: "Thu",
    },
    {
        id: "10",
        name: "College Friends",
        lastMessage: "Bruhhh check the meme I sent 😂",
        time: "Mon",
        unread: 4,
        isGroup: true,
    },
];

export default SAMPLE_CHATS;