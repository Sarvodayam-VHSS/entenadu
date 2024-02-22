import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { dataRef } from "../../../Firebase";

const { width } = Dimensions.get("window");
const cardWidth = (width - 32) / 2;

const MyProduct = ({ route }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { userDetails } = route.params;

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
          const filteredProducts = productsArray.filter(
            (product) => product.userId === userDetails.userId
          );

          setProducts(filteredProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userDetails.userId]);

  const truncatedName = (name, maxLength) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + "...";
    }
    return name;
  };

  const handleSelect = (id) => {
    navigation.navigate("EditProduct", {
      productId: id,
      userDetails: userDetails,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelect(item.id)} style={styles.tile}>
      <Image source={{ uri: item.image }} style={styles.tileImage} />
      <View style={styles.tileContent}>
        <Text style={styles.tileName}>{truncatedName(item.name, 40)}</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.tileAmount}>₹{item.amount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#009933" />
        </View>
      ) : products.length === 0 ? (
        <View style={styles.windowMsgContainer}>
          <Text style={styles.windowMsgText}>No products found.</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  windowMsgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f3f5",
    borderRadius: 8,
    padding: 16,
  },
  windowMsgText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    textAlign: "center",
  },
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

export default MyProduct;
