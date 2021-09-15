import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";

export default function App() {
  const [paciente, setPaciente] = useState("");
  const [procedimento, setProcedimento] = useState("");

  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(false);
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const CameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(CameraStatus.status === "granted");
      const MediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(MediaLibraryStatus.status === "granted");
    })();
  }, []);

  async function takePicture() {
    console.log("take picture!!")
    if (camera) {
      const options = { quality: 0.5, skipProcessing: true };
      const data = await camera.takePictureAsync(options);
      setImage(data.uri);
      setOpen(true);
      // console.log(data);
    } else {
      console.log('no img!!')
    }
  }

  async function handleAcceptPhoto() {
    handleSavePhoto();
    if (!image) {
      return;
    }
  }

  async function handleSavePhoto() {
    if (!image) {
      console.log(`no image!`);
      return;
    }
    const asset = await MediaLibrary.createAssetAsync(image);
    MediaLibrary.createAlbumAsync("ifofoca", asset)
      .then(() => {
        // console.log(`Album ${title} create!`);
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
  }

  const [flashMode, setFlashMode] = useState("off");

  const __handleFlashMode = () => {
    if (flashMode === "on") {
      setFlashMode("off");
    } else if (flashMode === "off") {
      setFlashMode("on");
    } else {
      setFlashMode("auto");
    }
  };

  if (hasCameraPermission === null || hasMediaLibraryPermission === null) {
    return <Text> msg="Conceda a permissão de Galeria para prosseguir" </Text>;
  }
  if (hasCameraPermission === false || hasMediaLibraryPermission === false) {
    return <Text> msg="Conceda a permissão de Camera para prosseguir" </Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Paciente</Text>
      <TextInput
        value={paciente}
        onChangeText={setPaciente}
        placeholder="paciente"
      />
      <Text>Procedimento</Text>
      <TextInput
        value={procedimento}
        onChangeText={setProcedimento}
        placeholder="procedimento"
      />
      <Button title="TIRAR FOTO" onPress={takePicture}/>
      <Camera
        // flashMode={flashMode}
        style={styles.camera}
        // type={type}
        ref={(ref) => setCamera(ref)}
        ratio="3:4"
      >
      </Camera>

      {image && (
        <Modal animationType="slide" transparent={false} visible={open}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
            }}
          >
            <Image
              style={{
                width: 500 - 30,
                height: 500 - 30,
                borderRadius: 10,
              }}
              source={{ uri: image }}
            />

            <Text style={styles.label}>Aceitar Imagem?</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ margin: 30 }}
                onPress={() => setOpen(false)}
              >
                <FontAwesome name="times" size={50} style={{ color: "gray" }} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ margin: 30 }}
                onPress={handleAcceptPhoto}
              >
                <FontAwesome
                  name="check"
                  size={50}
                  style={{ color: "#333333" }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 20,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  camera: {
    position: "absolute",
    marginTop: 200,
    width: 400,
    height: (400 * 4) / 3,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    margin: 20,
    borderRadius: 10,
    height: 50,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
    padding: 5,
    margin: 5,
    width: 200,
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
    marginTop: 50,
  },
  // takePictureButton: {
  //   position: 'absolute',
  //   height: 100,
  //   width: 100,
  //   zIndex: 3, // works on ios
  //   elevation: 3, // works on android
  // },
  takePictureViewA: {
    position: "absolute",
    right: 500 / 2 - 41,
    top: 32,
    borderWidth: 4,
    borderColor: "white",
    // backgroundColor: 'transparent',
    width: 82,
    height: 82,
    borderRadius: 50,
  },
  takePictureViewB: {
    position: "absolute",
    right: 500 / 2 - 35,
    top: 38,
    backgroundColor: "white",
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
