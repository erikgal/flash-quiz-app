import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { Modal } from 'react-native-paper'
import { COLORS } from '../../assets/colors'

interface CancelEditDeleteModalProps {
  visible: boolean
  onDismiss: () => void
  quizName: string
  onCancel: () => void
  onDelete: () => void
}

const CancelEditDeleteModal: React.FC<CancelEditDeleteModalProps> = ({ visible, onDismiss, quizName, onCancel, onDelete }: CancelEditDeleteModalProps) => {
  return (
    <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.containerStyle}>
    <View style={styles.modalContainerText}>
      <Text style={styles.modalText}>{`What do you want to do with the ${quizName} quiz?`}</Text>
    </View>
    <View style={styles.modalButtons}>
      <TouchableOpacity style={[styles.modalActions, { borderBottomLeftRadius: 20 }]} onPress={onCancel}>
        <Text style = {styles.actionText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.modalActions, { borderRightWidth: 1, borderLeftWidth: 1 }]}>
        <Text style = {styles.actionText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.modalActions, { borderBottomRightRadius: 20 }]} onPress={onDelete}>
        <Text style = {styles.actionText}>Delete</Text>
      </TouchableOpacity>
    </View>
  </Modal>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    width: '80%',
    height: '30%',
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: 'white'
  },
  modalText: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold'
  },
  modalContainerText: {
    flex: 2,
    // borderWidth: 1,
    // borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalButtons: {
    flex: 1,
    flexDirection: 'row'
    // borderWidth: 1,
    // borderColor: 'blue'
  },
  modalActions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'grey',
    borderTopWidth: 1
  },
  actionText: {
    color: COLORS.blue,
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default CancelEditDeleteModal
