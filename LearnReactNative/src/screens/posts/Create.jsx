// import component React Native
import {
  View,
  Text,
  TextInput,
  Button,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';

// import hook useState
import React, {useState} from 'react';

// import react native image picker
import {launchImageLibrary} from 'react-native-image-picker';

// import api
import Api from '../../services/api';

// import style
import styles from '../../styles';

// import handler error
import {handleErrors} from '../../utils/handleErrors';

export default function PostCreate({navigation}) {
  // init state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);

  // method handleChoosePhoto
  const handleChoosePhoto = async () => {
    // buat cek tombol benar-benar kepencet
    ToastAndroid.show(
      'Choose Image kepencet!',
      ToastAndroid.SHORT,
    );

    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });

      console.log('IMAGE PICKER RESPONSE:', response);

      // jika user cancel
      if (response.didCancel) {
        console.log('User membatalkan pemilihan gambar');
        return;
      }

      // jika image picker error
      if (response.errorCode) {
        console.log(
          'Image Picker Error:',
          response.errorCode,
          response.errorMessage,
        );
        return;
      }

      // jika berhasil memilih gambar
      if (response.assets && response.assets.length > 0) {
        setImage(response);

        console.log(
          'Gambar yang dipilih:',
          response.assets[0],
        );
      }
    } catch (error) {
      console.log('ERROR IMAGE PICKER:', error);
    }
  };

  // method storePost
  const storePost = async () => {
    // init FormData
    const formData = new FormData();

    // append title dan content
    formData.append('title', title);
    formData.append('content', content);

    // append image jika tersedia
    if (image && image.assets && image.assets[0]) {
      formData.append('image', {
        uri: image.assets[0].uri,
        type: image.assets[0].type,
        name:
          image.assets[0].fileName ||
          `photo-${Date.now()}.jpg`,
      });
    }

    try {
      await Api.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // show toast
      ToastAndroid.show(
        'Post Created Successfully!',
        ToastAndroid.LONG,
      );

      // redirect ke home
      navigation.push('PostIndex');
    } catch (error) {
      console.log('STORE POST ERROR:', error);

      if (error.response?.data) {
        handleErrors(error.response.data, setErrors);
      } else {
        ToastAndroid.show(
          'Terjadi kesalahan saat menyimpan post',
          ToastAndroid.LONG,
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        {/* upload image */}
        <View style={styles.upload}>
          <Button
            title="Choose Image"
            color="gray"
            onPress={handleChoosePhoto}
          />
        </View>

        {/* tampilkan nama gambar jika sudah dipilih */}
        {image?.assets?.[0]?.fileName && (
          <Text>
            {image.assets[0].fileName}
          </Text>
        )}

        {/* error image */}
        {errors?.image && (
          <Text style={styles.error}>
            {errors.image}
          </Text>
        )}

        {/* input title */}
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={value => setTitle(value)}
        />

        {/* error title */}
        {errors?.title && (
          <Text style={styles.error}>
            {errors.title}
          </Text>
        )}

        {/* input content */}
        <TextInput
          style={styles.textarea}
          placeholder="Content"
          value={content}
          onChangeText={value => setContent(value)}
          multiline
        />

        {/* error content */}
        {errors?.content && (
          <Text style={styles.error}>
            {errors.content}
          </Text>
        )}

        {/* button save */}
        <View
          style={{
            padding: 10,
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={storePost}>
            <Text style={styles.buttonText}>
              SAVE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}