import { useState } from "react";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface StreamCallbacks {
  onPartial: (token: string) => void;
}

export function useMockChatCompletion() {
  const [isStreaming, setIsStreaming] = useState(false);

  const fetchChatCompletion = (
    userMessage: string,
    conversation: ChatMessage[] = [],
    { onPartial }: StreamCallbacks
  ) => {
    setIsStreaming(true);

    const simulatedResponse = `This is a simulated response for "${userMessage}"${
      conversation.length > 0 ? " with conversation context." : "."
    }`;

    let index = 0;

    const intervalId = setInterval(() => {
      if (index < simulatedResponse.length) {
        onPartial(simulatedResponse[index]);

        index++;
      } else {
        clearInterval(intervalId);

        setIsStreaming(false);
      }
    }, 50);
  };

  return { fetchChatCompletion, isStreaming };
}
