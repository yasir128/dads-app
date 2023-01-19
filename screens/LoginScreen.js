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


export default function Login({ navigation }) {
  const [creds, setCreds, credsRef] = useState({});
  const [response, setResponse, responseRef] = useState();
  const [error, setError, errorRef] = useState();
  const [loading, setLoading] = useState()

  const signUp = () => {
    navigation.navigate('Create Account');
  };

  const updateCreds = (cred) => {
    setCreds((prev) => ({ ...prev, ...cred }));
  };

  const login = async () => {

    setLoading(true)
    try {
      response = await auth().signInWithEmailAndPassword(creds.username, creds.password)
      setResponse(response)
    }
    catch (err) { setError(err.message); }
    setLoading(false)
  };

  return (
    <SafeAreaView style={loginStyles.container}>
      <View style={loginStyles.logoContainer}>
        <Text style={loginStyles.logoPlaceholder}>Logo</Text>
      </View>
      <View style={loginStyles.inputsContainer}>
        <InputField
          label="Username"
          onInput={(e) => updateCreds({ username: e })}
          keyboardType="email-address"
        />
        <InputField
          label="Password"
          onInput={(e) => updateCreds({ password: e })}
          password
        />
      </View>
      <View style={loginStyles.errorContainer}>
        { error && <Text style={loginStyles.errorText}>{error}</Text> }
      </View>
      {loading && <ActivityIndicator size={30} color={'white'} />}
      <View style={loginStyles.buttonContainer}>
        <Button onPress={login} buttonTitle="Login" disabled={!creds.username || !creds.password || loading || !!response} />
      </View>
      <TouchableOpacity style={loginStyles.touchableOpacity} onPress={signUp}>
        <Text style={loginStyles.grayText}>Don't have an account? </Text>
        <Text style={loginStyles.linkText}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const loginStyles = StyleSheet.create({
  container: {
    backgroundColor: '#80af92',
    display: 'flex',
    flex: 1,
  },
  inputsContainer: {
    marginTop: 50
  },
  buttonContainer: {
    marginTop: 80,
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
