import React, { useCallback, useEffect, useState } from 'react';
import { ImageRequireSource, Linking } from 'react-native';

import { StyleSheet, View, Text, Image } from 'react-native';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import { CONTENT_SPACING, SAFE_AREA_PADDING } from './Constants';
import type { Routes } from './Routes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const BANNER_IMAGE = {uri:`https://images.unsplash.com/photo-1612805144400-88c7821bf36f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RlZXJpbmclMjB3aGVlbHxlbnwwfHwwfHw%3D&w=1000&q=80`}
// require('./assets/img/11.png') as ImageRequireSource;

export function PermissionsPage({ navigation }): React.ReactElement {
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState<CameraPermissionStatus>('not-determined');
  const [microphonePermissionStatus, setMicrophonePermissionStatus] = useState<CameraPermissionStatus>('not-determined');

  const requestMicrophonePermission = useCallback(async () => {
    console.log('Requesting microphone permission...');
    const permission = await Camera.requestMicrophonePermission();
    console.log(`Microphone permission status: ${permission}`);

    if (permission === 'denied') await Linking.openSettings();
    setMicrophonePermissionStatus(permission);
  }, []);

  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === 'denied') await Linking.openSettings();
    setCameraPermissionStatus(permission);
  }, []);

  useEffect(() => {
    if (cameraPermissionStatus === 'authorized') navigation.replace('CameraPage');
  }, [cameraPermissionStatus, microphonePermissionStatus, navigation]);

  return (
    <View style={styles.container}>
      <Image source={{uri:`https://images.unsplash.com/photo-1612805144400-88c7821bf36f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RlZXJpbmclMjB3aGVlbHxlbnwwfHwwfHw%3D&w=1000&q=80`}} style={styles.banner}  />
      <Text style={styles.welcome}>Welcome to{'\n'}Drowsy Driver.</Text>
      <View style={styles.permissionsContainer}>
        {cameraPermissionStatus !== 'authorized' && (
          <Text style={styles.permissionText}>
            Drowsy Driver needs <Text style={styles.bold}>Camera permission</Text>.{' '}
            <Text style={styles.hyperlink} onPress={requestCameraPermission}>
              Grant
            </Text>
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 38,
    fontWeight: 'bold',
    maxWidth: '80%',
  },
  banner: {
    opacity: 0.4,
...StyleSheet.absoluteFillObject
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    ...SAFE_AREA_PADDING,
  },
  permissionsContainer: {
    marginTop: CONTENT_SPACING * 2.5,
    position:'absolute',
    bottom:"7%",
    left:"3%"
    
  },
  permissionText: {
    fontSize: 17,
  },
  hyperlink: {
    color: '#007aff',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
});
