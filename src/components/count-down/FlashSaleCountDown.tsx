import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Row from '../row/Row'
import { TwoDotIcon } from '@/assets/svg'
import { Colors } from '@/constants/colors'
import { RobotoBoldText } from '../text/BMText'
import { fontSize } from '@/constants/font-size'

const FlashSaleCountDown: React.FC<{ expiredTime: string }> = ({
  expiredTime
}) => {
  const [time, setTime] = useState('')
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeDifference(expiredTime))
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [expiredTime])

  const getTimeDifference = (expiredString: string) => {
    const currentTime = new Date()
    const expiredDate = new Date(expiredString)
    if (isNaN(expiredDate.getTime())) {
      return ''
    }
    const timeDifference = expiredDate.getTime() - currentTime.getTime()

    if (timeDifference < 0) {
      return ''
    }

    const maxTime = 99 * 60 * 60 * 1000 // Maximum time allowed: 99 hours
    const limitedTimeDifference = Math.min(timeDifference, maxTime)

    const hours = Math.floor(limitedTimeDifference / (1000 * 60 * 60))
    const minutes = Math.floor(
      (limitedTimeDifference % (1000 * 60 * 60)) / (1000 * 60)
    )
    const seconds = Math.floor((limitedTimeDifference % (1000 * 60)) / 1000)

    const formattedTime = `${hours
      .toString()
      .padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    return formattedTime
  }

  const items = time.split(':')
  if (items.length == 0) {
    return null
  }

  return (
    <Row style={styles.container}>
      {items.map((e, index) => (
        <Row key={`${e}-${index}`} style={styles.itemContainer}>
          <View style={styles.circle}>
            <RobotoBoldText
              fontStyle={fontSize.title4}
              color={Colors.light.white}
            >
              {e}
            </RobotoBoldText>
          </View>
          {index !== 2 && (
            <View style={styles.dotContainer}>
              <TwoDotIcon />
            </View>
          )}
        </Row>
      ))}
    </Row>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 6
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4
  },
  circle: {
    width: 22,
    height: 22,
    backgroundColor: Colors.light.orange900,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default FlashSaleCountDown
