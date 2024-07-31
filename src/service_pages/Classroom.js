import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  Linking,
  Dimensions,
} from "react-native";
import { dataRef } from "../../Firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

const Classroom = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await dataRef.ref("classroom/").once("value");
      if (snapshot.exists()) {
        const data = snapshot.val();

        const dataList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        dataList.sort((a, b) => b.timestamp - a.timestamp);
        console.log(dataList);
        setData(dataList);
      }
    };

    fetchData();
  }, []);

  const handleLink = (url) => {
    Linking.openURL(url);
  };

  const GridItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleLink(item.videoUrl)}>
        <View style={styles.gridItem}>
          <Image source={{ uri: item.thumbnail }} style={styles.image} />
          <View style={styles.captionBox}>
            <Text style={styles.caption}>{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <GridItem item={item} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  gridItem: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: Dimensions.get("window").width / 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  captionBox: {
    padding: 10,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  caption: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Classroom;
