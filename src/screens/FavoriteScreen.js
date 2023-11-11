// FavoritesScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TouchableHighlight } from 'react-native';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const FavoritesScreen = ({ navigation, route }) => {
  const { favorites, setFavorites } = route.params || {};
  const favoriteItems = Array.isArray(favorites) ? favorites : [];

  const handleRemoveFavorite = (id) => {
    // Your logic to remove the item from favorites
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={true}
      onRequestClose={() => {
      }}
    >
      <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 }}>Favorites</Text>
        <ScrollView>
          {favoriteItems.length > 0 ? (
            favoriteItems.map((favorite) => (
              <TouchableHighlight
                key={favorite.id}
                onPress={() => handleRemoveFavorite(favorite.id)}
                underlayColor="#DDDDDD"
                style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}
              >
                <View>
                  <Text>{favorite.name}</Text>
                </View>
              </TouchableHighlight>
            ))
          ) : (
            <Text>No favorites available.</Text>
          )}
        </ScrollView>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default FavoritesScreen;