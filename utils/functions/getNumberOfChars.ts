import { QuestionForm } from '../../types'

export function getNumberOfChars (index: number, question: QuestionForm): number {
  console.log(index, question)
  const inputIndexArray: number[] = []
  question.question.split(' ').forEach((word, i) => {
    if (word.includes('xxx')) {
      inputIndexArray.push(i)
    }
  })

  let inputNumber: number | null = null
  inputIndexArray.forEach((inputIndex, i) => {
    if (inputIndex === index) {
      inputNumber = i
    }
  })

  if (inputNumber != null) {
    const answer = question.answer[inputNumber].reduce((a, b) => (a.length > b.length ? a : b), '')
    console.log(answer.length)
    return answer.length
  }
  console.log('ERROR: The answer corresponding to the input was not found')
  return 0
}
