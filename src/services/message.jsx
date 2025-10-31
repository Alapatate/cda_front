export const messageService = {
  sendMessage: async (content, sender) => {
    const response = await fetch(
      `http://${import.meta.env.VITE_API_URL}/api/messages/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, sender }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to send message");
    }
    const data = await response.json();
    return data.data;
  },
  getAllMessages: async () => {
    const response = await fetch(
      `http://${import.meta.env.VITE_API_URL}/api/messages/all`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }
    const data = await response.json();
    return data.data;
  },
};
