import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Linking } from "react-native";
import Toast from "react-native-toast-message";
import emailjs from "emailjs-com";
import {
  EMAIL_JS_SERVICE_ID,
  EMAIL_JS_TEMPLATE_ID,
  EMAIL_JS_USER_ID,
} from "@env";

const Contact = ({ route }) => {
  const { userDetails } = route.params;
  const [name, setName] = useState(userDetails.name);
  const [email, setEmail] = useState(userDetails.email);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const showToast = (msgType, message) => {
    Toast.show({
      type: msgType,
      text1: message,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const sendContactForm = () => {
    setLoading(true);

    const emailJsConfig = {
      service_id: EMAIL_JS_SERVICE_ID,
      template_id: EMAIL_JS_TEMPLATE_ID,
      user_id: EMAIL_JS_USER_ID,
    };

    const formTemplate = {
      from_name: name,
      from_email: email,
      message: message,
    };

    emailjs
      .send(
        emailJsConfig.service_id,
        emailJsConfig.template_id,
        formTemplate,
        emailJsConfig.user_id
      )
      .then(() => {
        showToast(
          "success",
          "Your response submitted successfully!"
        );
        setMessage("");
      })
      .catch((error) => {
        console.error("Email failed to send:", error);
        showToast(
          "error",
          "Failed to sumbmit your response!"
        );
      })
      .finally(() => {
        setLoading(false)
      })
  };

  const socials = [
    {
      name: "facebook",
      size: 30,
      color: "#4267B2",
      link: "https://www.facebook.com",
    },
    {
      name: "linkedin",
      size: 30,
      color: "#0077B5",
      link: "https://www.linkedin.com",
    },
    {
      name: "instagram",
      size: 30,
      color: "#C13584",
      link: "https://www.instagram.com",
    },
    {
      name: "twitter",
      size: 30,
      color: "#1DA1F2",
      link: "https://www.twitter.com",
    },
  ];
  const handlePress = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>GET IN TOUCH!</Text>
        <View style={styles.form}>
        <TextInput
            placeholder="Name"
            value={name}
            editable={false}
            style={styles.input}
          />
          <TextInput
            placeholder="E-mail"
            value={email}
            editable={false}
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Message"
            value={message}
            onChangeText={setMessage}
            style={[styles.input, styles.messageInput]}
            multiline
          />
          <TouchableOpacity onPress={sendContactForm} style={styles.button}>
            <Icon name="send" size={24} color="#fff" />
            <Text style={styles.buttonText}>Send Enquiry</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.socialIconsContainer}>
        {socials.map((network) => (
          <TouchableOpacity
            key={network.name}
            onPress={() => handlePress(network.link)}
          >
            <Icon
              name={network.name}
              size={network.size}
              color={network.color}
              style={styles.icon}
            />
          </TouchableOpacity>
        ))}
      </View>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f3f5",
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
    fontSize: 16,
  },
  messageInput: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  buttonText: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  icon: {
    marginHorizontal: 15,
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  icon: {
    margin: 10,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
});

export default Contact;
