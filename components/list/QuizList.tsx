import React from 'react'
import { COLORS } from '../../assets/colors'
import { Quiz } from '../../types'
import { List } from 'react-native-paper'

interface QuizListProps {
  quizList: Quiz[]
  onPress: (quiz: Quiz) => void
  onLongPress?: (quiz: Quiz) => void
}

const QuizList: React.FC<QuizListProps> = ({ quizList, onPress, onLongPress }: QuizListProps) => {
  return <>
            {quizList.map((quiz, i) => {
              const backgroundColor = i % 2 === 0 ? COLORS.lightGrey : 'white'
              const borderTopWidth = i !== 0 ? 0 : 1
              return (
              <List.Item
                key={quiz.id}
                title={quiz.title}
                description={quiz.description}
                onPress={() => onPress(quiz)}
                onLongPress={(onLongPress != null) ? () => onLongPress(quiz) : () => null}
                style={[listItem, { backgroundColor, borderTopWidth }]}
              ></List.Item>
              )
            })}
  </>
}

const listItem = {
  borderWidth: 1,
  borderColor: 'grey'
}

export default QuizList
