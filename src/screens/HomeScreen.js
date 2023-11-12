import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {BookmarkIcon, HeartIcon} from 'react-native-heroicons/outline'
import axios from 'axios';
import Recipes from '../components/recipes';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from './FavoritesContext';
import WeatherContainer from '../components/WeatherContainer';

export default function HomeScreen() {

  const [meals, setMeals] = useState([]);
  const navigation = useNavigation();
  const { favorites = [], addToFavorites, removeFromFavorites } = useFavorites();

  useEffect(() => {
    getRecipes();
  }, []);

  const navigateToFavorites = () => {
    navigation.navigate('FavoritesScreen', { favorites });
  };

  const getRecipes = async () => {
    try {
      const response = await axios.get('http://192.168.100.129:5000/api/HotandHumid');
      const data = response.data;
      setMeals(data.recipes);
  
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  

  return (
    <View style={{ flex: 1, backgroundColor: '#E3F0F6' }}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          {/* Add button to navigate to Favorites screen */}
          <Image source={require('../../assets/images/custom-logo.png')} style={{height: hp(5), width: hp(5.5)}} />
          <TouchableOpacity onPress={navigateToFavorites} className="p-2 rounded-full mr-5 bg-sky-600">
            <BookmarkIcon style={{color: "white", size: 40}} />
          </TouchableOpacity>
        </View>

        <View style={styles.greetings}>
          <Text style={{ fontSize: hp(3) }} className="font-semibold text-neutral-600">
            Weather Today
        </Text>
        </View>

        <View style={styles.middleContent}>
          <WeatherContainer />
        </View>

        {/* recipes */}
        <View>
          {meals && meals.length > 0 ? (
            <Recipes meals={meals} />
          ) : (
            <Text>No recipes available.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  middleContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  greetings: {
    marginLeft: 12
  },
});
