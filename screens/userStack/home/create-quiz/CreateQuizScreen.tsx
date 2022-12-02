import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { COLORS } from '../../../../assets/colors'
import RoundButton from '../../../../components/buttons/RoundButton'
import { RouterProps } from '../../../../types'
import RNPickerSelect, { Item } from 'react-native-picker-select'
import { Chevron } from 'react-native-shapes'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { setQuizInfo } from '../../../../utils/redux/createQuizSlice'

const CreateQuizScreeen: React.FC = ({ navigation }: RouterProps) => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [theme, setTheme] = useState<string>('')
  const [difficulty, setDifficulty] = useState<number>()
  const dispatch = useDispatch()
  const isMultipleChoice: number | undefined = useSelector((state: RootState) => state.createQuizSlice.quizInfo.isMultipleChoice)

  const difficultyList: Item[] = [
    { label: 'Easy', value: 0 },
    { label: 'Medium', value: 1 },
    { label: 'Hard', value: 2 }
  ]

  const handleNextPage = (): void => {
    if (name !== '' && description !== '' && theme !== '' && difficulty !== undefined && isMultipleChoice !== undefined) {
      dispatch(setQuizInfo({ name, description, theme, difficulty, isMultipleChoice }))
      if (isMultipleChoice === 1) {
        navigation.navigate('AddInfoToQuizMultipleChoiceScreen')
      } else {
        navigation.navigate('AddInformationToQuizScreen')
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>Here you can add all the information about the quiz.</Text>
        <View>
          <TextInput
            onChangeText={val => setName(val)}
            value={name}
            label="Name"
            mode="outlined"
            style={{ width: '100%' }}
            activeOutlineColor={COLORS.cyan}
          />
          <TextInput
            onChangeText={val => setDescription(val)}
            value={description}
            label="Description"
            mode="outlined"
            style={{ width: '100%' }}
            activeOutlineColor={COLORS.cyan}
          />
          <TextInput
            onChangeText={val => setTheme(val)}
            value={theme}
            label="Theme"
            mode="outlined"
            style={{ width: '100%' }}
            activeOutlineColor={COLORS.cyan}
          />
          <RNPickerSelect
            placeholder={{ value: difficulty, label: 'Select the difficulty of your quiz...          ' }}
            onValueChange={value => setDifficulty(value)}
            items={difficultyList}
            style={pickerSelectStyles}
            // @ts-expect-error
            Icon={() => <Chevron style={styles.icon} size={1.5} color="gray" onPress={() => console.log('hei')} />}
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
          />
        </View>
        <View style={styles.addQuestionButton}>
          <RoundButton disabled={false} loading={false} text={'Add Questions'} onPress={handleNextPage} />
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
  innerContainer: {
    width: '95%',
    alignSelf: 'center'
  },
  addQuestionButton: {
    position: 'relative',
    marginTop: 20,
    bottom: 0,
    alignSelf: 'flex-end'
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  icon: {
    marginTop: 12
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    textAlign: 'center',
    minWidth: '85%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: COLORS.cyan,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputIOS: {
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: '#ffffff',
    minWidth: '100%',
    marginTop: 6,
    paddingVertical: 18,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 5,
    color: 'black'
  },
  iconContainer: {
    top: 15,
    right: 15
  }
})

export default CreateQuizScreeen
