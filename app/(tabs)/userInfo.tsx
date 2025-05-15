import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { login, signup, selectIsAuth, logout } from "../../api/slices/auth";

export default function UserInfoScreen() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const user = useAppSelector((state) => state.auth.data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loginInput, setLogin] = useState("");
  const [passwordInput, setPassword] = useState("");
  const [nameInput, setName] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      if (isRegisterMode) {
        await dispatch(
          signup({
            login: loginInput,
            password: passwordInput,
            name: nameInput,
          })
        ).unwrap();
      } else {
        await dispatch(
          login({ login: loginInput, password: passwordInput })
        ).unwrap();
      }
    } catch (err: any) {
      setError(err.message || "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isRegisterMode ? "Создать аккаунт" : "Добро пожаловать"}
      </Text>

      <View style={styles.formContainer}>
        {isRegisterMode && (
          <TextInput
            style={styles.input}
            placeholder="Ваше имя"
            placeholderTextColor="#666"
            value={nameInput}
            onChangeText={setName}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Логин"
          placeholderTextColor="#666"
          value={loginInput}
          onChangeText={setLogin}
        />

        <TextInput
          style={styles.input}
          placeholder="Пароль"
          placeholderTextColor="#666"
          secureTextEntry
          value={passwordInput}
          onChangeText={setPassword}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {isRegisterMode ? "Зарегистрироваться" : "Войти"}
            </Text>
          )}
        </TouchableOpacity>

        {isAuth && (
          <View style={styles.authContainer}>
            <Text style={styles.successText}>
              Вы вошли как {user?.name || "пользователь"}
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.logoutButton]}
              onPress={handleLogout}
            >
              <Text style={styles.buttonText}>Выйти</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          onPress={() => setIsRegisterMode(!isRegisterMode)}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleText}>
            {isRegisterMode
              ? "Уже есть аккаунт? Войти"
              : "Ещё нет аккаунта? Создать"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF",
    justifyContent: "center",
    padding: 24,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0396BF",
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  button: {
    backgroundColor: "#0396BF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  toggleButton: {
    marginTop: 16,
  },
  toggleText: {
    color: "#0396BF",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },
  errorText: {
    color: "#dc3545",
    textAlign: "center",
    marginBottom: 12,
    fontSize: 14,
  },
  successText: {
    color: "#28a745",
    textAlign: "center",
    marginBottom: 16,
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    marginTop: 8,
  },
  authContainer: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
    paddingTop: 24,
  },
});
