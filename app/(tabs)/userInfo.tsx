import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { login, signup, selectIsAuth, logout } from "../../api/slices/auth";

export default function UserInfoScreen() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const user = useAppSelector((state) => state.auth.data);

  const [loginInput, setLogin] = useState("");
  const [passwordInput, setPassword] = useState("");
  const [nameInput, setName] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleSubmit = () => {
    if (isRegisterMode) {
      dispatch(
        signup({ login: loginInput, password: passwordInput, name: nameInput })
      );
    } else {
      dispatch(login({ login: loginInput, password: passwordInput }));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isRegisterMode ? "Регистрация" : "Авторизация"}
      </Text>

      {isRegisterMode && (
        <TextInput
          style={styles.input}
          placeholder="Имя"
          value={nameInput}
          onChangeText={setName}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Логин"
        value={loginInput}
        onChangeText={setLogin}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        secureTextEntry
        value={passwordInput}
        onChangeText={setPassword}
      />

      <Button
        title={isRegisterMode ? "Зарегистрироваться" : "Войти"}
        onPress={handleSubmit}
      />

      {isAuth && (
        <>
          <Text style={styles.success}>
            Вы авторизованы как {user?.name || "пользователь"}!
          </Text>
          <View style={styles.logoutButton}>
            <Button title="Выйти" color="red" onPress={handleLogout} />
          </View>
        </>
      )}

      <TouchableOpacity onPress={() => setIsRegisterMode(!isRegisterMode)}>
        <Text style={styles.toggleText}>
          {isRegisterMode
            ? "Уже есть аккаунт? Войти"
            : "Нет аккаунта? Зарегистрируйтесь"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    marginVertical: 8,
    padding: 10,
  },
  title: {
    paddingTop: 24,
    fontSize: 22,
    marginBottom: 16,
    textAlign: "center",
  },
  success: {
    color: "green",
    textAlign: "center",
    marginTop: 10,
  },
  toggleText: {
    color: "#007BFF",
    textAlign: "center",
    marginTop: 16,
    textDecorationLine: "underline",
  },
  logoutButton: {
    marginTop: 16,
  },
});
