import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'
// import { SelectList } from 'react-native-dropdown-select-list'
import { COLORS } from '../../../assets/colors'
import RoundButton from '../../../components/buttons/RoundButton'
import { RouterProps } from '../../../types'

const CreateQuizScreeen: React.FC = ({ navigation }: RouterProps) => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  // const [difficulty, setDifficulty] = useState<number>()
  const [theme, setTheme] = useState<string>('')

  // const difficultyList = [
  //   {
  //     key: 'Easy',
  //     value: 0
  //   },
  //   {
  //     key: 'Medium',
  //     value: 1
  //   },
  //   {
  //     key: 'Hard',
  //     value: 2
  //   }
  // ]

  const handleNextPage = (): void => {
    navigation.navigate('AddQuestionToQuizScreen')
  }

  return (
    <View style={styles.container}>
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
        {/* <SelectList
          setSelected={setDifficulty}
          data={difficultyList}
          save="key"
          defaultOption={(difficultyList[0].key, difficultyList[0].value)}
        /> */}
      </View>
      <View style={styles.addQuestionButton}>
        <RoundButton disabled={false} loading={false} text={'Add Questions'} onPress={handleNextPage} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  addQuestionButton: {
    paddingTop: '80%',
    position: 'relative',
    bottom: 0,
    alignSelf: 'flex-end'
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    flex: 1,
    width: '95%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingBottom: 50
    // borderWidth: 2,
    // borderColor: 'magenta'
  }
})

export default CreateQuizScreeen
