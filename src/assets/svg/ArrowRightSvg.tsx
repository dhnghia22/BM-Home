import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
const ArrowRightSvg = (props: SvgProps) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      d="M5.352 12.497a.578.578 0 0 1 0-.817l3.502-3.503a.25.25 0 0 0 0-.353L5.352 4.32a.578.578 0 0 1 .817-.817l3.68 3.68.11.11a1 1 0 0 1 0 1.414l-3.79 3.79a.578.578 0 0 1-.817 0Z"
    />
  </Svg>
)
export default ArrowRightSvg
