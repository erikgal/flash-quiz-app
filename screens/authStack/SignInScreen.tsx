import React, { useState } from 'react'
import { StyleSheet, View, Text, Keyboard } from 'react-native'
import { TextInput } from 'react-native-paper'
import Icon from '@expo/vector-icons/Ionicons'
import { RouterProps } from '../../types'
import SignUp from '../../components/buttons/SignUpButton'
import { COLORS } from '../../assets/colors'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import wrapAsyncFunction from '../../utils/functions/wrapAsyncFunction'

const SignInScreen: React.FC = ({ navigation }: RouterProps) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const auth = getAuth()

  const handleEmailChange = (val): void => {
    setEmail(val)
  }

  const handlePasswordChange = (val): void => {
    setPassword(val)
  }

  const signIn = async (): Promise<void> => {
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
    Keyboard.dismiss()
  }

  return (
    <View style={styles.container}>
      <View style={styles.topTextContainer}>
        <Text style={styles.signUp}>Sign in</Text>
        <Text style={styles.desc}>Please sign in to continue</Text>
      </View>
      <View style={styles.bottomInputContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.inputPadding}>
            <TextInput
              onChangeText={handleEmailChange}
              value={email}
              label="Email"
              mode="outlined"
              style={{ width: '100%' }}
              activeOutlineColor={COLORS.cyan}
              outlineColor={'black'}
              right={<TextInput.Icon icon="email" />}
            />
          </View>
          <View style={styles.inputPadding}>
            <TextInput
              onChangeText={handlePasswordChange}
              value={password}
              label="Password"
              mode="outlined"
              style={{ width: '100%' }}
              secureTextEntry={secureTextEntry}
              activeOutlineColor={COLORS.cyan}
              outlineColor={'black'}
              right={
                <TextInput.Icon
                  name={() => (
                    <Icon name={'eye'} size={20} onPress={() => setSecureTextEntry(!secureTextEntry)} />
                  )}
                />
              }
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
            <Text style={styles.error}>
                {error}
            </Text>
          <SignUp onPress={wrapAsyncFunction(signIn)} text={'Sign In'} loading={loading}/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  topTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signUp: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingBottom: 7
  },
  desc: {
    fontSize: 15,
    justifyContent: 'center'
  },
  bottomInputContainer: {
    flex: 4,
    alignItems: 'center'
    // borderWidth: 2,
    // borderColor: 'magenta'
  },
  inputContainer: {
    flex: 1,
    width: '80%',
    justifyContent: 'center',
    marginTop: 20
    // borderWidth: 2,
    // borderColor: 'purple'
  },
  inputPadding: {
    flex: 1,
    justifyContent: 'center'
    // borderWidth: 2,
    // borderColor: 'green'
  },
  error: {
    color: 'red',
    fontSize: 14,
    paddingBottom: 5
  },
  buttonContainer: {
    flex: 1,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})

export default SignInScreen
