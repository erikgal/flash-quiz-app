import React from 'react'
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { COLORS } from '../../assets/colors'

interface UploadButtonProps {
  onPress: () => void
  size: number
}

const UploadButton: React.FC<UploadButtonProps> = ({ onPress, size }: UploadButtonProps) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: 10,
      bottom: 10
    },
    roundButton: {
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: size,
      backgroundColor: COLORS.cyan
    },
    icon: {
      fontSize: 32,
      color: 'white'
    }
  })

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity onPress={onPress} style={styles.roundButton}>
            <Icon name="upload" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  )
}

export default UploadButton
