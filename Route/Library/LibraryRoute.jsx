
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Library } from "./Library";
import { SavedAnime } from "./SavedAnime";
import { AboutProject } from "./AboutPage";
import { AnimeDetailPage } from "../AnimeDetailPage";
import EachCharactersDetails from "../EachCharactersDetailsPage";
import { UpiDetail } from "./UpiDetail";
import { SettingsPage } from "./SettingsPage";

const Stack = createNativeStackNavigator();
export const LibraryRoute = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false, animation:'ios'}}>
      <Stack.Screen  name="LibraryPage" component={Library} />
      <Stack.Screen  name="SavedAnime" component={SavedAnime} />
      <Stack.Screen  name="AboutPage" component={AboutProject} />
      <Stack.Screen  name="Settings" component={SettingsPage} />
      <Stack.Screen  name="AnimeDetail" component={AnimeDetailPage} />
      <Stack.Screen name={"EachCharactersDetails"} component={EachCharactersDetails}/>
      <Stack.Screen name={"UpiDetails"} component={UpiDetail}/>
    </Stack.Navigator>
  );
};

