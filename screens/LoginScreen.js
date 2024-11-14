import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, resetPassword } from "../firebase"; // Firebase config & resetPassword function
import { signInWithEmailAndPassword } from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons"; // For Google Icon

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "745901751173-kg97vmd0mvmpkgbqgncq9r65prbi5upa.apps.googleusercontent.com", // Web client ID from Firebase
  });

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User details", user);
      })
      .catch((error) => {
        console.log("Error logging in", error);
        Alert.alert("Login Error", error.message);
      });
  };

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert("Please enter your email address.");
      return;
    }
    resetPassword(email)
      .then((message) => Alert.alert("Success", message))
      .catch((error) => Alert.alert("Error", error.message));
  };

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("User signed in via Google:", userCredential.user);
          navigation.replace("Main"); // Redirect to main app screen on successful login
        })
        .catch((error) => {
          console.error("Firebase sign-in error:", error);
          Alert.alert("Error", "Failed to sign in with Google.");
        });
    }
  }, [response]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Main");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.innerContainer} behavior="padding">
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Sign-in</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter Email"
            placeholderTextColor={"#A5D6A7"}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            placeholder="Enter Password"
            placeholderTextColor={"#A5D6A7"}
            style={styles.input}
          />
        </View>

        <Pressable onPress={login} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Continue</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Register")} style={styles.signupTextContainer}>
          <Text style={styles.signupText}>
            Don't have an account? <Text style={styles.signupLink}>Sign Up</Text>
          </Text>
        </Pressable>

        {/* Forgot Password */}
        <Pressable onPress={handleForgotPassword} style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </Pressable>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.divider} />
        </View>

        {/* Google Login */}
        <Pressable onPress={() => promptAsync()} style={styles.googleButton}>
          <Ionicons name="logo-google" size={24} color="black" />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    width: '100%',
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: "#388E3C",
    fontSize: 32,
    fontWeight: "700",
  },
  inputContainer: {
    marginVertical: 10,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4CAF50",
  },
  input: {
    fontSize: 16,
    borderBottomColor: "#388E3C",
    borderBottomWidth: 1,
    marginVertical: 10,
    paddingVertical: 5,
    color: "#388E3C",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#388E3C",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupTextContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  forgotPasswordContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  signupText: {
    color: "#666",
    fontSize: 16,
  },
  signupLink: {
    color: "#388E3C",
    fontWeight: "600",
  },
  forgotPasswordText: {
    color: "#003580",
    fontSize: 16,
    fontWeight: "500",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
  },
  orText: {
    marginHorizontal: 10,
    color: "#666",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: 280,
  },
  googleButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
