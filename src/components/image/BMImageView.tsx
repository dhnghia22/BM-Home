import FastImage, { FastImageProps, ResizeMode } from 'react-native-fast-image';
import React from 'react';

interface BMImageProps extends FastImageProps {
  url?: string;
  source?: any;
  resizeMode?: ResizeMode;
}

const BMImageView = (props: BMImageProps) => {
  const { url, source, defaultSource, ...rest } = props;
  return url || source ? (
    <FastImage
      source={source || { uri: url }}
      defaultSource={require('@/assets/images/placeholder.png')}
      resizeMode="cover"
      {...rest}
    />
  ) : (
    <FastImage source={defaultSource} resizeMode="cover" {...rest} />
  );
};

export default BMImageView;