import { Dimensions, ImageBackground, Linking, View } from "react-native";
import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import { SpaceBetween } from "../../../../Layout/SpaceBetween";
import { Heading } from "../../../Global/Heading";
import { PaddingConatiner } from "../../../../Layout/PaddingConatiner";
import FastImage from "react-native-fast-image";
import { CrouselButton } from "./CrouselButton";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Spacer } from "../../../Global/Spacer";
import { AirbnbRating } from "react-native-ratings";
import { EachGenres } from "../../../Global/EachGenres";
import { memo, useCallback, useEffect, useState } from "react";
import { GetLanguage } from "../../../../LocalStorage/AppSettings";

export const EachCrousel = memo(function EachCrousel({backgroundImage, id, trailer, name, image, geners, ratings, data}) {
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;
  const theme = useTheme()
  const [title, setTitle] = useState(name?.english ?? name?.userPreferred);
  const getName = useCallback(async ()=>{
    const tempname = await GetLanguage()
    if (tempname === 'English') {
      setTitle( name?.english ?? name?.userPreferred)
    } else  if (tempname === "Romaji") {
      setTitle(name?.romaji ?? name?.userPreferred)
    } else {
      setTitle(name?.native ?? name?.userPreferred)
    }
  },[])
  useEffect(()=>{
    getName()
  },[])
  return (
    <ImageBackground blurRadius={4}  style={{
      flex:1,
    }} source={{
      uri:backgroundImage,
    }}>
      <View style={{flex:1, backgroundColor:"rgba(0,0,0,0.44)"}}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={['rgba(0,0,0,0.07)', 'rgba(0,0,0,0.2)', "rgba(0,0,0,0.72)","black"]} style={{
          height:width / 1.06,
          justifyContent:"flex-end",
        }}>
          <PaddingConatiner>
            <SpaceBetween>
              <View style={{
                flex:1,
                paddingRight:20,
              }}>
                <Heading text={title}/>
                <AirbnbRating
                  count={5}
                  readonly={true}
                  defaultRating={ratings}
                  showRating={false}
                  size={15}
                  starContainerStyle={{
                    alignItems:"flex-start",
                    width:"100%",
                    justifyContent:"flex-start",
                    paddingVertical:5,
                  }}
                  reviewSize={0}
                  startingValue={ratings}
                  ratingCount={5}
                  isDisabled={true}
                />
                <View style={{flexDirection:"row", flexWrap:"wrap", gap:5}}>
                  {geners.slice(0,4).map((e,i)=>{
                    return <EachGenres title={e} key={i}/>
                  })}
                </View>
                <Spacer/>
                <View style={{flexDirection:"row",gap:10}}>
                  <CrouselButton text={"Watch Now"} color={theme.colors.primary} onPress={()=>{
                    navigation.navigate("AnimeDetail",{genres:geners,image,name:title, data, id })
                  }}/>
                  <CrouselButton dontShowPlayButton={!trailer} text={trailer ? "Watch Trailer" : "Trailer unavailable"} color={"rgba(33,53,118,0)"} onPress={async ()=>{
                   if (trailer){
                     await Linking.openURL(`https://www.youtube.com/watch?v=${trailer}`);
                   }
                  }}/>
                </View>
              </View>
              <FastImage
                style={{ width: 120, height: (width / 1.35) - 90, borderRadius:5, elevation:10}}
                source={{
                  uri: image,
                }}
              />
            </SpaceBetween>
          </PaddingConatiner>
          <View style={{height:35}}/>
        </LinearGradient>
      </View>
    </ImageBackground>
  );
})


