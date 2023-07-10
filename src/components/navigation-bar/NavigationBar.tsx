import { BackIcon } from '@/assets/svg';
import Row from '@/components/row/Row';
import { RobotoMediumText } from '@/components/text/BMText';
import BMTouchableOpacity from '@/components/touchable-opacity/BMTouchableOpacity';
import { ColorPalette } from '@/constants/colors';
import { commonStyles } from '@/constants/common-style';
import useColors from '@/hooks/use-colors';
import React, { useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import { EdgeInsets, useSafeArea } from 'react-native-safe-area-context';
import FlexView from '../flex/FlexView';
import NavigationService from '@/utils/navigation';

const NavigationBar: React.FC<{title: string}> = ({title}) => {
  const colors = useColors();
  const padding = useSafeArea();
  const styles = useMemo(() => createStyle(colors, padding), [colors, padding])

  const onBackPress = () => {
    NavigationService.goBack()
  }

  return (
    <View style={[styles.container, styles.padding]}>
      <Row style={[commonStyles.padding_8_16]}>
        <BMTouchableOpacity style={styles.icon} onPress={onBackPress}>
          <BackIcon width={24} height={24}/>
        </BMTouchableOpacity>
        <FlexView style={commonStyles.center}>
          <RobotoMediumText>{title}</RobotoMediumText>
        </FlexView>
        <View style={styles.viewRight}/>
      </Row>
    </View>
  )
}



const createStyle = (colors: ColorPalette, padding: EdgeInsets) => {
  return StyleSheet.create({
    container: {
    },
    padding: {
      paddingTop: padding.top,
    },
    icon: {
      width: 24,
      height: 24,
      marginRight: 8
    },
    marginLeft8: {
      marginLeft: 8
    },
    viewRight: {
      width: 24
    }
  });
};

export default NavigationBar;
