import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  const [columns, setColumns] = useState(2);

  const gridItems = [
    {
      label: "Electrical",
      image: require("./../../assets/lightning.png"),
      value: "Electrician",
    },
    {
      label: "Plumbing",
      image: require("./../../assets/plumbing.png"),
      value: "Plumber",
    },
    {
      label: "Construction",
      image: require("./../../assets/workers.png"),
      value: "Construction",
    },
    {
      label: "Coconut",
      image: require("./../../assets/coconut.png"),
      value: "Coconut Climbing",
    },
    {
      label: "Kooli Pani",
      image: require("./../../assets/pickaxe.png"),
      value: "Kooli Pani",
    },
    {
      label: "Welding",
      image: require("./../../assets/construction-and-tools.png"),
      value: "Welding",
    },
    { label: "Tile", image: require("./../../assets/tile.png"), value: "Tile" },
    {
      label: "Aluminium",
      image: require("./../../assets/kitchen.png"),
      value: "Aluminium",
    },
    {
      label: "Woodwork",
      image: require("./../../assets/woodworking.png"),
      value: "Wood Work",
    },
    {
      label: "Well",
      image: require("./../../assets/water-well.png"),
      value: "Well",
    },
  ];

  const handleSelect = (item) => {
    navigation.navigate("UsersList", { skillSector: item.value });
  };

  const renderGridItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => handleSelect(item)}
    >
      <Image source={item.image} style={styles.gridImage} />
      <Text style={styles.gridLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={gridItems}
        renderItem={renderGridItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={columns}
        style={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    padding: 20,
  },
  grid: {
    marginTop: 10,
  },
  gridItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 5,
  },
  gridImage: {
    marginBottom: 10,
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  gridLabel: {
    fontSize: 14,
    color: "#2c3e50",
    textAlign: "center",
  },
});

export default Home;
