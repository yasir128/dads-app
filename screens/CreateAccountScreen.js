import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import Button from '../components/Button';
import InputField from '../components/InputField';


import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';


export default function CreateAccountScreen({ navigation }) {
  const [creds, setCreds, credsRef] = useState({});
  const [response, setResponse, responseRef] = useState();
  const [error, setError, errorRef] = useState();
  const [loading, setLoading] = useState()

  // const [displayName, setDisplayName, displayNameRef] = useState()
  // const [phoneNumber, setPhoneNumber, phoneNumberRef] = useState()

  const updateCreds = (cred) => {
    setCreds((prev) => ({ ...prev, ...cred }));
  };

  // useEffect(() => {
  //   auth().onAuthStateChanged(async (user) => { // adding more information about user once account created
  //     console.log("onAuthStateChanged", displayNameRef.current, displayNameRef.current)
  //     if (user) {
  //       user.updateProfile({ phoneNumber: phoneNumber,  displayName: displayName, photoURL: "" })
  //       .then(() => console.log("success", user))
  //       .catch(err => { setError(error); console.log(error); })
  //     }
  //   })
  // }, [])

  const createAccount = () => {
    setLoading(true)
    auth().createUserWithEmailAndPassword(creds.username, creds.password)
    .then(response => {
      // console.log("user", response.user, displayName, phoneNumber)
      // firebase.database().ref('users/' + response.user.uid).set({ phoneNumber: phoneNumber,  displayName: displayName, photoURL: "https://media.istockphoto.com/photos/male-silhouette-as-avatar-profile-picture-picture-id519078727?k=6&m=519078727&s=170667a&w=0&h=YSEa8Eia7WKxx4FeSM53AGW9DqBtFwg5KHyGno-W7fc=" })
      setResponse(response)
    })
    .catch((err) => { setError(err.message); console.log(err); })
    setLoading(false)
  };

  const login = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={createAccountStyles.container}>
      <View style={createAccountStyles.logoContainer}>
        <Text style={createAccountStyles.logoPlaceholder}>Logo</Text>
      </View>
      <View style={createAccountStyles.inputsContainer}>
        {/* <InputField
          label="Name"
          onInput={(e) => setDisplayName( e )}
        />
        <InputField
          label="Phone number"
          onInput={(e) => setPhoneNumber( e )}
          keyboardType="phone-pad"
        /> */}
        <InputField
          label="Email"
          onInput={(e) => updateCreds({ username: e })}
          keyboardType="email-address"
        />
        <InputField
          label="Password"
          onInput={(e) => updateCreds({ password: e })}
          password
        />
      </View>
      <View style={createAccountStyles.errorContainer}>
        { error && <Text style={createAccountStyles.errorText}>{error}</Text> }
      </View>
      {loading && <ActivityIndicator size={30} color="white"  />}
      <View style={createAccountStyles.buttonContainer}>
        <Button onPress={createAccount} buttonTitle="Create Account" disabled={!creds.username || !creds.password || loading || !!response} />
      </View>
      <TouchableOpacity style={createAccountStyles.touchableOpacity} onPress={login}>
        <Text style={createAccountStyles.grayText}>Already have an account?</Text>
        <Text style={createAccountStyles.linkText}>Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const createAccountStyles = StyleSheet.create({
  container: {
    backgroundColor: '#80af92',
    display: 'flex',
    flex: 1,
  },
  credsContainer: {
    marginTop: 50
  },
  credsText: {},
  buttonContainer: {
    marginTop: 80,
  },
  inputsContainer: {
    marginTop: 50
  },
  touchableOpacity: {
    alignItems: 'center',
    margin: 30,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  linkText: {
    color: '#27436b',
  },
  grayText: {
    color: '#383838',
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  errorText: {
    color: '#872e2c',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#872e2c',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoContainer: {
    margin: 50,
    display: 'flex',
    alignItems: 'center',
  },
  logoPlaceholder: {
    fontSize: 20,
    color: '#ffff',
  },
});
