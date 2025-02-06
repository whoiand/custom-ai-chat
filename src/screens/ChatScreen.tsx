import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { useMockChatCompletion } from "../utils/api";
import { Button, Text } from "@components";
import { useAppStore, ChatMessage } from "../store/useAppStore";
import { theme } from "@theme/theme";

const ChatScreen = () => {
  const { messages, addMessage, updateLastMessage } = useAppStore();

  const { fetchChatCompletion, isStreaming } = useMockChatCompletion();

  const [inputText, setInputText] = useState("");

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: inputText,
    };
    addMessage(userMessage);
    setInputText("");

    const aiMessage: ChatMessage = {
      role: "assistant",
      content: "",
    };
    addMessage(aiMessage);

    fetchChatCompletion(userMessage.content, [], {
      onPartial: (token: string) => {
        updateLastMessage(token);
      },
    });
  };

  const renderItem = ({ item }: { item: ChatMessage }) => (
    <View
      style={[
        styles.messageContainer,
        item.role === "user" ? styles.userMessage : styles.aiMessage,
      ]}
    >
      <Text variant='body'>{item.content}</Text>
    </View>
  );

  const ListEmptyElement = (
    <Text style={styles.emptyMessage} variant='subheader'>
      Don't be shy, say hello!
    </Text>
  );

  const textInputPlaceholder = isStreaming
    ? "Answering..."
    : "Type a message...";

  return (
    <View style={styles.container}>
      <FlatList
        ListEmptyComponent={ListEmptyElement}
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.chatList}
        {...(isStreaming && { ListFooterComponent: <ActivityIndicator /> })}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={textInputPlaceholder}
          placeholderTextColor={theme.colors.muted}
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title='Send' onPress={handleSend} disabled={isStreaming} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyMessage: {
    color: theme.colors.muted,
    marginTop: theme.spacing.lg,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  chatList: {
    paddingBottom: theme.spacing.lg,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.sm,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
  },
  input: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    padding: theme.spacing.sm,
  },
  messageContainer: {
    marginVertical: theme.spacing.sm,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: theme.colors.accent,
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.sm,
    justifyContent: "center",
  },
});

export default ChatScreen;
