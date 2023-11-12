// FavoritesScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

const FavoriteScreen = ({ route }) => {
  const { favorites } = route.params || [];
  const favoriteItems = Array.isArray(favorites) ? favorites : [];
  const navigation = useNavigation();


  const handleFavoriteItemClick = (item) => {
    // Navigate to the detailed recipe screen with the selected favorite item
    navigation.navigate('RecipeDetail', { ...item });
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={true}
      onRequestClose={() => {navigation.goBack()}}
    >
      <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 }}>Favorites</Text>
        <ScrollView>
          {favoriteItems.length > 0 ? (
            favoriteItems.map((favorite) => (
              <TouchableOpacity
                key={favorite.id}
                onPress={() => navigation.push('RecipeDetail', { ...favorite })}
                style={{ flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}
              >
                <Image
                  source={{ uri: favorite.image }}
                  style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                />
                <Text>{favorite.Name}</Text>
              </TouchableOpacity>
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

export default FavoriteScreen;
