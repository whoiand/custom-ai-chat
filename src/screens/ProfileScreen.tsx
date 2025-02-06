import React, { useState } from "react";
import { View, StyleSheet, Image, Alert, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAppStore } from "@store/useAppStore";
import { Text, Button } from "@components";
import { theme } from "@theme/theme";

const ProfileScreen = () => {
  const { user, setUser, logout } = useAppStore((state) => state);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [profilePic, setProfilePic] = useState<string | null>(
    user?.profilePic ?? null
  );

  const handleSave = () => {
    if (!user) return;

    const updated = { ...user, name, profilePic };

    setUser(updated);

    Alert.alert(
      "Profile Updated",
      "Your profile has been updated successfully."
    );

    setIsEditing(false);
  };

  const pickProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      quality: 1,
    });
    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text variant='body'>No user logged in.</Text>
      </View>
    );
  }

  const ContentElement = isEditing ? (
    <TextInput
      style={styles.input}
      placeholder='Enter your name'
      placeholderTextColor={theme.colors.muted}
      value={name}
      onChangeText={setName}
    />
  ) : (
    <>
      <Text variant='body' style={styles.info}>
        Name: {user.name}
      </Text>
      <Text variant='body' style={styles.info}>
        Email: {user.email}
      </Text>
    </>
  );

  const ButtonsElement = isEditing ? (
    <>
      <Button title='Change Profile Picture' onPress={pickProfileImage} />
      <Button title='Save' onPress={handleSave} />
    </>
  ) : (
    <Button title='Edit Profile' onPress={() => setIsEditing(true)} />
  );

  return (
    <View style={styles.container}>
      <Text variant='header' style={styles.title}>
        Profile
      </Text>

      <Image
        source={
          profilePic
            ? { uri: profilePic }
            : { uri: "https://via.placeholder.com/120?text=No+Image" }
        }
        style={styles.profileImage}
      />

      {ContentElement}

      <View style={styles.bottomContainer}>
        {ButtonsElement}

        <Button title='Logout' onPress={logout} color={theme.colors.danger} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    marginTop: "auto",
    gap: 8,
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    alignItems: "center",
  },
  title: {
    marginBottom: theme.spacing.lg,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: theme.spacing.md,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginVertical: theme.spacing.sm,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  info: {
    fontSize: theme.fontSize.md,
    marginBottom: theme.spacing.sm,
  },
});

export default ProfileScreen;
