/**
 * Dads App
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useRef } from 'react';
 import {
   StyleSheet,
   ImageBackground,
   Animated,
   View,
   TouchableOpacity
 } from 'react-native';

 import { NavigationContainer } from '@react-navigation/native';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import auth from '@react-native-firebase/auth';
 import Icon from 'react-native-vector-icons/FontAwesome5';

 // import { generateID } from './helperFunctions/randomGen'

 import useState from 'react-usestateref';

 import LoginScreen from './screens/LoginScreen';
 import CreateAccountScreen from './screens/CreateAccountScreen';
 import HomeScreen from './screens/HomeScreen';
 import ChatScreen from './screens/ChatScreen';
 import ProfileScreen from './screens/ProfileScreen';
 import ContactsScreen from './screens/ContactsScreen';
 import ForumHomeScreen from './screens/ForumHomeScreen';
 import ForumChildrenScreen from './screens/ForumChildrenScreen'
 import ForumPostScreen from './screens/ForumPostScreen'
 // import FlowchartScreen from './screens/FlowchartScreen'
 import FlowchartScreen from './screens/FlowchartQuizScreen'
 import UserForumPostScreen from './screens/UserForumPostScreen'

 import { MixpanelProvider, useMixpanel }  from './Analytics';

 const Stack = createNativeStackNavigator();
 const ChatStack = createNativeStackNavigator();
 const ForumStack = createNativeStackNavigator();
 const HomeStack = createNativeStackNavigator()
 const FlowchartStack = createNativeStackNavigator();
 const Tab = createBottomTabNavigator();


import {GestureHandlerRootView} from 'react-native-gesture-handler';

 const linking = {
  prefixes: ['dadsapp://', 'dadsapp://post/'],
    config: {
      screens: {
        HomeTabs: {
          screens: {
            Forum: {
              screens: {
                Post: {
                  path: '/:selectedTopic/:postId/',
                }
              }
            }
          }
        },
      },
    }
};


const screenOptions = ({ navigation }) => ({
  headerStyle: { backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 },
  headerTransparent: true,
  headerShadowVisible: false,
  headerBackVisible: false,
  headerTitle: '',
  headerLeft: ({ canGoBack }) => canGoBack ? <HeaderBackButton navigation={navigation} /> : (<></>)
})


const headerBackButtonStyles = StyleSheet.create({
    container: {
        backgroundColor: '#80af92',
        width: 45,
        height: 45,
        borderRadius: 50,
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        //SHADOW
        shadowColor: '#adadad',
        elevation: 3,
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 1,
    },
})

const HeaderBackButton = ({ navigation }) => (
    <TouchableOpacity
      onPress={() => { navigation.goBack(); } }
      style={headerBackButtonStyles.container} >
      <Icon name="arrow-left" size={25} color='white' />
    </TouchableOpacity>
)


export const UserContext = React.createContext();

 const ChatScreens = () => (
   <ChatStack.Navigator screenOptions={screenOptions} >
     <ChatStack.Screen component={ContactsScreen} name="Contacts" />
     <ChatStack.Screen
       component={ChatScreen}
       name="Chat"
       options={({ route }) => ({ title: "" })}
     />
   </ChatStack.Navigator>
 );

 const ForumScreens = ({ navigation }) => {

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      e.preventDefault();
      navigation.navigate('Forum', {screen: 'Forum Home'});
    });
  }, [navigation])

  return (
   <ForumStack.Navigator initialRouteName="Forum Home" screenOptions={screenOptions} >
     <ForumStack.Screen component={ForumHomeScreen} name="Forum Home" options={{ headerShown: false }} />
     <ForumStack.Screen component={ForumChildrenScreen} name="Forum Children" options={({ route }) => ({ title: route.params.selectedTopic, }) } />
     <ForumStack.Screen
      component={ForumPostScreen}
      name="Post"
      options={({ route }) => ({ title: '' })}
      getId={({params}) => params.postId}
    />
    <ForumStack.Screen component={UserForumPostScreen} name="Forum Post" options={{headerShown: true, title: 'Create a Post'}} />
   </ForumStack.Navigator>
 )
}

const HomeScreens = () => (
  <HomeStack.Navigator screenOptions={screenOptions}>
    <HomeStack.Screen component={HomeScreen} name="Home" options={{ headerShown: false }} />
    <HomeStack.Screen component={FlowchartScreen} name="Flowchart" options={{ headerShown: true }} />
    <HomeStack.Screen component={ForumChildrenScreen} name="Forum Children" options={({ route }) => ({ title: route.params.selectedTopic, }) } />
    <HomeStack.Screen component={ForumPostScreen} name="Post" options={({ route }) => ({ title: '', headerShown: true })} />
    <HomeStack.Screen component={UserForumPostScreen} name="Forum Post" options={{headerShown: true, title: 'Create a Post'}} />
  </HomeStack.Navigator>
)


const FlowchartScreens = () => (
  <FlowchartStack.Navigator screenOptions={screenOptions}>
    <FlowchartStack.Screen component={FlowchartScreen} name="Flowchart" options={{ headerShown: true }} />
    <FlowchartStack.Screen component={ForumPostScreen} name="Post" options={({ route }) => ({ title: '', headerShown: true })} />
  </FlowchartStack.Navigator>
)


 const Tabs = () => (
   <Tab.Navigator
     screenOptions={{
       unmountOnBlur: true,
       headerShown: false,
       tabBarActiveTintColor: '#efeded',
       tabBarInactiveTintColor: '#020202',
       tabBarShowLabel: false,
       tabBarIconSize: 10,
       tabBarStyle: {
         backgroundColor: '#80af92',
         borderBottomLeftRadius: 20,
         borderBottomRightRadius: 20,
         margin: 6,
         borderRadius: 1,
         height: 70,
       },
     }}>
     <Tab.Screen
       name="Home Screens"
       component={HomeScreens}
       options={{
         tabBarIcon: ({ color, size }) => (
           <Icon name="home" color={color} size={size} />
         ),
       }}
     />
     <Tab.Screen
       name="Divorce Process"
       component={FlowchartScreens}
       options={{
         tabBarIcon: ({ color, size }) => (
           <Icon name="code-branch" color={color} size={size} />
         ),
       }}
     />
     <Tab.Screen
       name="Forum"
       component={ForumScreens}
       options={{
         tabBarIcon: ({ color, size }) => (
           <Icon name="balance-scale" color={color} size={size} />
         ),
      }}
     />
     <Tab.Screen
       name="Profile"
       component={ProfileScreen}
       options={{
         tabBarIcon: ({ color, size }) => (
           <Icon name="user-circle" color={color} size={size} />
         ),
       }}
     />
   </Tab.Navigator>
 );

const FADEDURATION = 3000

export default function App() {
   const [initializing, setInitializing] = useState(true);
   const [user, setUser] = useState();
   const [showSplash, setShowSplash] = useState(FADEDURATION)

   const opacityRef = useRef(new Animated.Value(1)).current

   function onAuthStateChanged(user) {
     if (user) {
       if (user.displayName) { setUser(user); return; }
       user.updateProfile({ displayName: user.email.split('@')[0] }).then(() => {
         setUser(user)
       }).catch(error => console.log(error) )
     }
     if (!user) { setUser(false) } // logging out
   }

   useEffect(() => {
     setTimeout(() => {
       setShowSplash(false);
     }, FADEDURATION);
     // WATCH AUTH STATUS FIREBASE
     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
     if (initializing) setInitializing(false);
     return subscriber; // unsubscribe on unmount
   }, []);

   useEffect(() => {
      Animated.timing(opacityRef, {
        toValue: 0,
        duration: FADEDURATION,
        useNativeDriver: true,
      }).start();
   }, [opacityRef]);

   if (initializing) return null;

   if (showSplash) return (
     <View style={{backgroundColor: '#80af92'}}>
      <Animated.Image
        source={ require('./assets/dads-beach-photo-crop.jpg') }
        resizeMode="cover"
        blurRadius={1}
        fadeDuration={0}
        style={{opacity: opacityRef, width: '100%', height: '100%'}} />
      </View>
    )

    if (!user) return (
      <>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ unmountOnBlur: true, headerShown: false }}>
            <Stack.Screen component={LoginScreen} name="Login" />
            <Stack.Screen component={CreateAccountScreen} name="Create Account" />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    )

   return (
     <GestureHandlerRootView style={{ flex: 1 }}>
       <UserContext.Provider value={user}>
         <MixpanelProvider>
           <NavigationContainer linking={linking}>
             <Stack.Navigator
               screenOptions={{ unmountOnBlur: true, headerShown: false }}>
               <Stack.Screen component={Tabs} name="HomeTabs" />
             </Stack.Navigator>
           </NavigationContainer>
         </MixpanelProvider>
       </UserContext.Provider>
     </GestureHandlerRootView>
   );
}
