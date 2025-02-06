import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Text } from "@components";
import { useAppStore } from "@store/useAppStore";
import { theme } from "@theme/theme";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const login = useAppStore((state) => state.login);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginFormValues) => {
    const success = login(data.email, data.password);
    if (!success) {
      Alert.alert(
        "Invalid Credentials",
        "Please check your email and password."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text variant='header' style={styles.title}>
        I am your AI-friend
      </Text>
      <Controller
        control={control}
        name='email'
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder='Email'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType='email-address'
            autoCapitalize='none'
          />
        )}
      />
      {errors.email && (
        <Text variant='caption' style={styles.error}>
          {errors.email.message}
        </Text>
      )}
      <Controller
        control={control}
        name='password'
        rules={{ required: "Password is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder='Password'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && (
        <Text variant='caption' style={styles.error}>
          {errors.password.message}
        </Text>
      )}
      <Button title='Login' onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    justifyContent: "center",
  },
  title: {
    marginBottom: theme.spacing.lg,
    textAlign: "center",
  },
  error: {
    color: theme.colors.danger,
    marginBottom: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
  },
});

export default LoginScreen;
