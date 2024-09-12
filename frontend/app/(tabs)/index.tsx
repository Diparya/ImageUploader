import React, { useState, useEffect } from 'react';
import { Button, Image, View, Alert, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'; // Axios for making HTTP requests
import * as FileSystem from 'expo-file-system'; // Used for accessing file system (to get the image path)

export default function HomeScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need access to your photo library to upload images.');
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!imageUri) return;

    // Get file info
    const fileInfo = await FileSystem.getInfoAsync(imageUri);
    const fileName = imageUri.split('/').pop();

    // Create FormData to send the image
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: fileName,
      type: 'image/jpeg', // Adjust this if it's another format
    }as any);

    try {
      const response = await axios.post('http://192.168.146.135:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Image uploaded successfully!');
        // Remove image preview
        setImageUri(null);
        setUploadStatus(null); // Reset upload status
      } else {
        setUploadStatus('Failed to upload image');
      }
    } catch (error) {
      setUploadStatus(`Error uploading image: ${error}`);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Pick an Image" onPress={pickImage} />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginVertical: 20 }} />
      )}
      <Button title="Upload Image" onPress={uploadImage} />
      {uploadStatus && <Text>{uploadStatus}</Text>}
    </View>
  );
}
