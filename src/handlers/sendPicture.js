import RNFS from 'react-native-fs';
// import axios from 'axios';

export const sendPictureToServer = async picture => {
  // Code to send the image to the server
  // This could involve using the fetch API or a third-party library like axios
  try {
    RNFS.readFile(picture.path, 'base64').then(async res => {
      const filePath = `${RNFS.DocumentDirectoryPath}/myfile.txt`;

      // axios.post('http://192.168.18.80:8000/api/v1/predict',{
      //   image:res,
      //   device_id:"1023673-asfda-6758"
      // }).then(({data})=>{
      //   console.log("axios resp : ",{data});
      // }).catch((e)=>{
      //   console.log("axios error => : ",e);
      // })
      const response = await fetch(
        'http://localhost:8000/api/v1/predict',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-fyp-key': '@H#U5UzrCO@n27QlmGJPSAi&iK1',
          },
          body: JSON.stringify({image : res,device_id:"1023673-asfda-6758"}),
        },
      );
      console.log(response);
      //   RNFS.writeFile(filePath, JSON.stringify(res), 'utf8')
      //     .then(() => console.log('File written successfully at : ', filePath))
      //     .catch(error => console.error('Error writing file:', error));
      //   // console.log(JSON.stringify(res.));
    });

    // Handle the server response if necessary
  } catch (error) {
    console.log(error);

    // Handle the error if necessary
  }
};

export const takePhoto = async (camera, onMediaCaptured, flash) => {
  try {
    if (camera.current == null) throw new Error('Camera ref is null!');

    console.log('Taking photo...');
    const photo = await camera.current.takePhoto({
      photoCodec: 'jpeg',
      qualityPrioritization: 'speed',
      flash: flash,
      quality: 90,
      skipMetadata: true,
    });
    onMediaCaptured(photo, 'photo');
  } catch (e) {
    console.error('Failed to take photo!', e);
  }
};
