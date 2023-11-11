import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { CachedImage } from '../helpers/image';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon } from 'react-native-heroicons/outline';
import {  HeartIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/loading';
import YouTubeIframe from 'react-native-youtube-iframe';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Platform } from 'react-native';
import * as Linking from 'expo-linking';

const ios = Platform.OS=='ios';



export default function RecipeDetailScreen(props) {
    let item = props.route.params;
    const [isFavourite, setIsFavourite] = useState(false);
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiEndpoint = `http://192.168.100.129:5000/api/HotandHumid/${item.id}`;
        getMealData(apiEndpoint);
      }, []);
      

      const getMealData = async (apiEndpoint) => {
        try {
          const response = await axios.get(apiEndpoint);
          if (response && response.data) {
            setMeal(response.data.recipe);
            setLoading(false);
          } else {
            console.log('Recipe not found');
            setLoading(false);
          }
        } catch (err) {
          console.log('error: ', err.message);
        }
      };
      

    const ingredientsIndexes = (meal)=>{
        if(!meal) return [];
        let indexes = [];
        for(let i = 1; i<=20; i++){
            if(meal['Ingredients'+i]){
                indexes.push(i);
            }
        }

        return indexes;
    }

    const getYoutubeVideoId = url=>{
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
          return match[1];
        }
        return null;
    }

    const handleOpenLink = url=>{
        Linking.openURL(url);
    }

  return (
    <View className="flex-1 bg-white relative">
        <StatusBar style={"light"} />
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 30}}
        >
        
        {/* recipe image */}
        <View className="flex-row justify-center">
            <CachedImage
                uri={item.image}
                // sharedTransitionTag={item.strMeal} // this will only work on native image (now using Image from expo-image)
                style={{width: wp(100), height: hp(50),borderBottomLeftRadius: 40, borderBottomRightRadius: 40}}

            />
        </View>

        {/* back button */}
        <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14">
            <TouchableOpacity onPress={()=> navigation.goBack()} className="p-2 rounded-full ml-5 bg-white">
                <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> setIsFavourite(!isFavourite)} className="p-2 rounded-full mr-5 bg-white">
                <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite? "red": "gray"} />
            </TouchableOpacity>
        </Animated.View>

        {/* meal description */}
        {
            loading? (
                <Loading size="large" className="mt-16" />
            ):(
                <View className="px-4 flex justify-between space-y-4 pt-8">
                    {/* name and area */}
                    <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-2">
                        <Text style={{fontSize: hp(3)}} className="font-bold flex-1 text-neutral-700">
                        {meal?.Name}
                        </Text>
                        <Text style={{fontSize: hp(2)}} className="font-medium flex-1 text-neutral-500">
                            Desription
                        </Text>
                    </Animated.View>
                    {/* misc */}
                    <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className="flex-row justify-around">
                        <View className="flex rounded-full bg-amber-300 p-2">
                            <View 
                                style={{height: hp(6.5), width: hp(6.5)}}
                                className="bg-white rounded-full flex items-center justify-center"
                            >
                                <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                            </View>
                            <View className="flex items-center py-2 space-y-1">
                                <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700">
                                    {meal?.CookingTime}
                                </Text>
                            </View>
                        </View>
                        <View className="flex rounded-full bg-amber-300 p-2">
                            <View 
                                style={{height: hp(6.5), width: hp(6.5)}}
                                className="bg-white rounded-full flex items-center justify-center"
                            >
                                <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                            </View>
                            <View className="flex items-center py-2 space-y-1">
                                <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700">
                                    {meal?.Servings}
                                </Text>
                                <Text style={{fontSize: hp(1.3)}} className="font-bold text-neutral-700">
                                    Servings
                                </Text>
                            </View>
                        </View>
                        <View className="flex rounded-full bg-amber-300 p-2">
                            <View 
                                style={{height: hp(6.5), width: hp(6.5)}}
                                className="bg-white rounded-full flex items-center justify-center"
                            >
                                <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                            </View>
                            <View className="flex items-center py-2 space-y-1">
                                <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700">
                                    {meal?.Calories}
                                </Text>
                                <Text style={{fontSize: hp(1.3)}} className="font-bold text-neutral-700">
                                    Cal
                                </Text>
                            </View>
                        </View>
                        <View className="flex rounded-full bg-amber-300 p-2">
                            <View 
                                style={{height: hp(6.5), width: hp(6.5)}}
                                className="bg-white rounded-full flex items-center justify-center"
                            >
                                <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                            </View>
                            <View className="flex items-center py-2 space-y-1">
                                <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700">
                                    
                                </Text>
                                <Text style={{fontSize: hp(1.3)}} className="font-bold text-neutral-700">
                                    {meal?.Difficulty}
                                </Text>
                            </View>
                        </View>
                    </Animated.View>

                    {/* ingredients */}
                    <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="space-y-4">
                        <Text style={{fontSize: hp(2.5)}} className="font-bold flex-1 text-neutral-700">
                            Ingredients
                        </Text>
                                  <View className="space-y-2 ml-3">
                                      {meal?.Ingredients.split(',').map((ingredient, index) => (
                                          <Text key={index} style={{ fontSize: hp(1.7) }} className="font-medium text-neutral-700">
                                              {`\u2022 ${ingredient}`}
                                          </Text>
                                      ))}
                                  </View>
                                  
                    </Animated.View>
                    {/* instructions */}
                    <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="space-y-4">
                        <Text style={{fontSize: hp(2.5)}} className="font-bold flex-1 text-neutral-700">
                            Instructions
                        </Text>
                        <Text style={{fontSize: hp(1.6)}} className="text-neutral-700">
                            {meal?.Instruction}
                        </Text>
                    </Animated.View>

                    


                </View>
            )
        }
        </ScrollView>
    </View>
    
  )
}