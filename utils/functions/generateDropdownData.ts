import { Item } from 'react-native-picker-select'

export function generateDropdownData (numOfItems: number): Item[] {
  if (numOfItems === 0) return []

  const labelCap = [5, 10, 15, 25, 50, 75, 100]
  const data: Item[] = []

  let i = 0
  while (i < labelCap.length && numOfItems > labelCap[i]) {
    data.push({ key: `${labelCap[i]}`, value: labelCap[i], label: `${labelCap[i]} Questions` })
    i += 1
  }
  if (numOfItems < 150) {
    data.push({ key: `${numOfItems}`, value: numOfItems, label: `${numOfItems} Questions` })
    return data
  }

  let cap = 150
  while (numOfItems > cap) {
    data.push({ key: `${cap}`, value: cap, label: `${cap} Questions` })
    cap += 50
  }
  data.push({ key: `${numOfItems}`, value: numOfItems, label: `${numOfItems} Questions` })
  return data
}
