import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { dataRef } from "../../../Firebase";

const { width } = Dimensions.get("window");
const cardWidth = (width - 32) / 2;

const ShoppingList = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsSnapshot = await dataRef.ref("market").once("value");
        const productsData = productsSnapshot.val();

        if (productsData) {
          const productsArray = Object.entries(productsData).map(
            ([id, product]) => ({
              id,
              ...product,
            })
          );
          setProducts(productsArray);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const truncatedName = (name, maxLength) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + "...";
    }
    return name;
  };

  const handleSelect = (id) => {
    navigation.navigate("ShopProduct", { productId: id });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelect(item.id)} style={styles.tile}>
      <Image
        source={{ uri: item.image }}
        style={styles.tileImage}
      />
      <View style={styles.tileContent}>
        <Text style={styles.tileName}>{truncatedName(item.name, 40)}</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.tileAmount}>₹{item.amount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={products}
      numColumns={2}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  tile: {
    width: cardWidth,
    height: 220,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    margin: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  tileImage: {
    width: "100%",
    height: 130,
    borderRadius: 8,
    marginBottom: 8,
  },
  tileContent: {
    flex: 1,
  },
  tileName: {
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 15,
  },
  amountContainer: {
    position: "absolute",
    bottom: 1,
    left: 0.5,
  },
  tileAmount: {
    color: "#009933",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ShoppingList;
