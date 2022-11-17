import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { Modal } from 'react-native-paper'
import { COLORS } from '../../assets/colors'

interface AreYouSureDeleteModalProps {
  visible: boolean
  onDismiss: () => void
  action: string
  onCancel: () => void
  onDelete: () => void
}

const AreYouSureDeleteModal: React.FC<AreYouSureDeleteModalProps> = ({ visible, onDismiss, action, onCancel, onDelete }: AreYouSureDeleteModalProps) => {
  return (
    <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.containerStyle}>
    <View style={styles.modalContainerText}>
      <Text style={styles.modalText}>{`Are you sure you want to ${action}?`}</Text>
    </View>
    <View style={styles.modalButtons}>
      <TouchableOpacity style={[styles.modalActions, { borderBottomLeftRadius: 20, borderRightWidth: 1 }]} onPress={onCancel}>
        <Text style = {styles.actionText}>Cancel</Text>
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
    fontWeight: 'bold',
    padding: 12

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
    borderColor: COLORS.grey,
    borderTopWidth: 1
  },
  actionText: {
    color: COLORS.blue,
    fontWeight: 'bold',
    fontSize: 18
  }
})

export default AreYouSureDeleteModal
