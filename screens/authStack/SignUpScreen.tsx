import React, { useState } from 'react'
import { StyleSheet, View, Text, Keyboard } from 'react-native'
import { TextInput } from 'react-native-paper'
import Icon from '@expo/vector-icons/Ionicons'
import { RouterProps } from '../../types'
import SignUp from '../../components/buttons/SignUpButton'
import { COLORS } from '../../assets/colors'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import wrapAsyncFunction from '../../utils/functions/wrapAsyncFunction'

const SignUpScreen: React.FC = ({ navigation }: RouterProps) => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true)
  const [validEmail, setValidEmail] = useState<boolean>(true)
  const [validPassword, setValidPassword] = useState<boolean>(true)
  const [hasSignUp, setHasSignUp] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const auth = getAuth()

  const handleEmailChange = (val): void => {
    setEmail(val)
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/
    setValidEmail(reg.test(val))
  }

  const handlePasswordChange = (val): void => {
    setPassword(val)
    setValidPassword(val.length >= 6)
  }

  const signUp = async (): Promise<void> => {
    setLoading(true)
    try {
      await (await createUserWithEmailAndPassword(auth, email, password))
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
    setHasSignUp(true)
    Keyboard.dismiss()
    updateProfile(auth.currentUser!, {
      displayName: name
    })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.topTextContainer}>
        <Text style={styles.signUp}>Sign up</Text>
        <Text style={styles.desc}>To join the FlashQuiz community!</Text>
      </View>
      <View style={styles.bottomInputContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.inputPadding}>
            <TextInput
              onChangeText={val => setName(val)}
              value={name}
              label="Name"
              mode="outlined"
              style={{ width: '100%' }}
              activeOutlineColor={COLORS.cyan}
              right={<TextInput.Icon name={() => <Icon name={'person'} size={20} />} />}
            />
          </View>
          <View style={styles.inputPadding}>
            <TextInput
              onChangeText={handleEmailChange}
              value={email}
              label="Email"
              mode="outlined"
              style={{ width: '100%' }}
              activeOutlineColor={!hasSignUp ? COLORS.cyan : !validEmail ? 'red' : COLORS.cyan}
              outlineColor={!hasSignUp ? 'black' : !validEmail ? 'red' : 'black'}
              right={<TextInput.Icon icon="email" />}
            />
            {!validEmail && hasSignUp && <Text style={styles.invalidInput}> Email is invalid </Text>}
          </View>
          <View style={styles.inputPadding}>
            <TextInput
              onChangeText={handlePasswordChange}
              value={password}
              label="Password"
              mode="outlined"
              style={{ width: '100%' }}
              secureTextEntry={secureTextEntry}
              activeOutlineColor={!hasSignUp ? COLORS.cyan : !validPassword ? 'red' : COLORS.cyan}
              outlineColor={!hasSignUp ? 'black' : !validPassword ? 'red' : 'black'}
              right={
                <TextInput.Icon
                  name={() => (
                    <Icon name={'eye'} size={20} onPress={() => setSecureTextEntry(!secureTextEntry)} />
                  )}
                />
              }
            />
            {!validPassword && hasSignUp && (
              <Text style={[styles.invalidInput, { marginBottom: 50 }]}>
                Password has to be more than 6 characters
              </Text>
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.error}>
                {error}
            </Text>
          <SignUp onPress={wrapAsyncFunction(signUp)} text={'Sign up'} loading={loading}/>
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
    flex: 5,
    width: '80%',
    justifyContent: 'center'
    // borderWidth: 2,
    // borderColor: 'purple'
  },
  inputPadding: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20
  },
  invalidInput: {
    color: 'red',
    fontSize: 12
  },
  error: {
    color: 'red',
    fontSize: 14,
    paddingBottom: 5
  },
  buttonContainer: {
    flex: 2,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center'
    // borderWidth: 2,
    // borderColor: 'yellow'
  }
})

export default SignUpScreen
