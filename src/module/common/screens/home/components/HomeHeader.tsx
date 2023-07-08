import { Inbox, LocationFilled, Menu } from '@/assets/svg';
import Row from '@/components/row/Row';
import { RobotoBoldText } from '@/components/text/BMText';
import BMTouchableOpacity from '@/components/touchable-opacity/BMTouchableOpacity';
import { ColorPalette } from '@/constants/colors';
import { commonStyles } from '@/constants/common-style';
import { fontSize } from '@/constants/font-size';
import useColors from '@/hooks/use-colors';
import React, { useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import { EdgeInsets, useSafeArea } from 'react-native-safe-area-context';

const HomeHeader: React.FC = () => {
  const colors = useColors();
  const padding = useSafeArea();
  const styles = useMemo(() => createStyle(colors, padding), [colors, padding])

  return (
    <View style={[styles.container, styles.padding]}>
      <Row style={[commonStyles.padding_8_16]}>
        <View style={styles.icon}>
          <LocationFilled />
        </View>
        <RobotoBoldText style={commonStyles.flex1} fontStyle={fontSize.title2}>Friendship Tower</RobotoBoldText>
        <BMTouchableOpacity style={[styles.icon, styles.marginLeft8]}>
          <Inbox />
        </BMTouchableOpacity>
        <BMTouchableOpacity  style={[styles.icon, styles.marginLeft8]}>
          <Menu />
        </BMTouchableOpacity>
      </Row>
    </View>
  )
}



const createStyle = (colors: ColorPalette, padding: EdgeInsets) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background
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
    }
  });
};

export default HomeHeader;
