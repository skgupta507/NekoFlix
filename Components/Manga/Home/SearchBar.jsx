import { memo } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "@react-navigation/native";
import { PlainText } from "../../Global/PlainText";

export const SearchBar = memo(({onFocus, placeholder, onChangeText, showSearchButton, onSearchPress, keyboard, searchButtonText, showIcon}) => {
  const style = StyleSheet.create({
    textfeild:{
      borderRadius:10,
      paddingHorizontal:10,
      flex:1,
      color:"white",
    },
    mainContainer:{
      backgroundColor:"#1e1c1c",
      flexDirection:"row",
      alignItems:"center",
      paddingHorizontal:showSearchButton ? 5 : 10,
      borderRadius:10,
      borderColor:"rgb(25,23,23)",
      borderWidth:1,
    },
  })
  return (
    <View style={style.mainContainer}>
      {showIcon && <Feather name="search" size={20} color="white"/>}
      <TextInput onFocus={onFocus} keyboardType={keyboard ? keyboard : 'default'} style={style.textfeild} placeholder={placeholder} onChangeText={(text)=>{
        onChangeText(text)
      }}/>
      {showSearchButton && <SearchButton onPress={onSearchPress} searchButtonText={searchButtonText}/>}
    </View>
  );
});

function SearchButton({onPress, searchButtonText}) {
  const theme = useTheme()
  const style = StyleSheet.create({
    button:{
      backgroundColor:theme.colors.primary,
      borderRadius:6,
      padding:10,
      flexDirection:"row",
    },
  })
  return <Pressable onPress={onPress} style={style.button}>
    <PlainText text={searchButtonText ? searchButtonText : "Search"}/>
  </Pressable>
}