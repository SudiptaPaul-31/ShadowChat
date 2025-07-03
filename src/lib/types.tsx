export interface Profile {
    id: string;
    name: string;
    image: string;
    status: 'online' | 'offline';
    lastMessage?: string;
    time?: string;
    unread?: number;
  }