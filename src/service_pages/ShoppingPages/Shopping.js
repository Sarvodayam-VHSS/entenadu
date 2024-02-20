import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Shopping = ({ route }) => {
  const navigation = useNavigation();
  const { userId } = route.params;

  const gridItems = [
    {
      label: "Buy",
      image: require("./../../../assets/shopping-bag.png"),
      value: "ShoppingList",
    },
    {
      label: "Sell",
      image: require("./../../../assets/selling.png"),
      value: "SellProduct",
    },
    {
      label: "My Products",
      image: require("./../../../assets/demonstration.png"),
      value: "MyProduct",
    },
  ];

  const handleSelect = (item) => {
      navigation.navigate(item.value, { userId: userId });
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
        numColumns={2}
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
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  gridLabel: {
    fontSize: 14,
  },
});

export default Shopping;
