import * as React from 'react';
import useState from 'react-usestateref';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import Button from '../components/Button';
import InputField from '../components/InputField';


import auth from '@react-native-firebase/auth';


export default function CreateAccountScreen({ navigation }) {
  const [creds, setCreds, credsRef] = useState({});
  const [response, setResponse, responseRef] = useState();
  const [error, setError, errorRef] = useState();
  const [loading, setLoading] = useState()

  const updateCreds = (cred) => {
    setCreds((prev) => ({ ...prev, ...cred }));
  };

  const createAccount = async () => {
    setLoading(true)
    try {
      let response = await auth().createUserWithEmailAndPassword(creds.username, creds.password)
      setResponse(response)
    }
    catch (err) { setError(err.message) }
    setLoading(false)
  };

  const login = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={createAccountStyles.container}>
      <View style={createAccountStyles.logoContainer}>
        <Text style={createAccountStyles.logoPlaceholder}>Logo</Text>
      </View>
      <View style={createAccountStyles.inputsContainer}>
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
    </SafeAreaView>
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
