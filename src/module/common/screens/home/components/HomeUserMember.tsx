import React, { useMemo } from 'react'
import { ImageBackground, StyleSheet, View, Image, Text } from 'react-native'
import { ColorPalette, Colors } from '@/constants/colors'
import { fontSize } from '@/constants/font-size'
import useColors from '@/hooks/use-colors'
import FlexView from '@/components/flex/FlexView'
import Row from '@/components/row/Row'
import { RobotoBoldText, RobotoMediumText } from '@/components/text/BMText'
import BMTouchableOpacity from '@/components/touchable-opacity/BMTouchableOpacity'
import { BestbaeGraphicsImage, MemberBackgroundImage } from '@/assets/images'
import { translate } from '@/i18n/translate'
import ArrowRightSvg from '@/assets/svg/ArrowRightSvg'

const HomeUserMember: React.FC = React.memo(() => {
  const colors = useColors()
  const styles = useMemo(() => createStyle(colors), [colors])

  return (
    <View style={styles.container}>
      <BMTouchableOpacity style={styles.contentContainer}>
        <ImageBackground
          style={styles.imageBackground}
          source={MemberBackgroundImage}
        >
          <Row style={styles.row}>
            <FlexView>
              <FlexView style={styles.flexView}>
                <RobotoBoldText
                  fontStyle={fontSize.title2}
                  color={colors.white}
                >
                  Hi Khoi, Let's order 10 to become Bestbae
                </RobotoBoldText>
              </FlexView>
              <FlexView>
                <ProcessView total={10} current={5} />
                <Row style={{flex: 1, alignItems: 'flex-end'}}>
                  <RobotoBoldText color={Colors.light.white}>{translate('home_screen.explorer_now')}</RobotoBoldText>
                  <ArrowRightSvg color={Colors.light.white} />
                </Row>
              </FlexView>
            </FlexView>
            <Image style={styles.imageBestBae} source={BestbaeGraphicsImage} />
          </Row>
        </ImageBackground>
      </BMTouchableOpacity>
    </View>
  )
})

interface IProcessView {
  total: number
  current: number
}

const ProcessView: React.FC<IProcessView> = ({ total, current }) => {
  const percent = `${(current / total) * 100}%`

  return (
    <Row style={processStyle.row}>
      <FlexView style={processStyle.flexView}>
        <View style={[processStyle.progressBar, { width: percent }]}></View>
      </FlexView>
      <RobotoMediumText
        fontStyle={fontSize.title4}
        color={Colors.light.white}
      >{`${current}/${total}`}</RobotoMediumText>
    </Row>
  )
}

const createStyle = (colors: ColorPalette) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.gray100,
      paddingTop: 8
    },
    contentContainer: {
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingVertical: 14
    },
    imageBackground: {
      width: '100%',
      aspectRatio: 343 / 157
    },
    row: {
      paddingLeft: 16
    },
    flexView: {
      justifyContent: 'center'
    },
    imageBestBae: {
      height: '100%',
      aspectRatio: 1
    }
  })
}

const processStyle = StyleSheet.create({
  row: {
    alignItems: 'center'
  },
  flexView: {
    height: 7,
    backgroundColor: Colors.light.white,
    borderRadius: 8,
    marginRight: 8,
    overflow: 'hidden'
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.light.primary
  }
})

export default HomeUserMember
