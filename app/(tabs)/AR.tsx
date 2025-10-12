import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { GLView } from 'expo-gl';
import { Renderer, TextureLoader, THREE } from 'expo-three';
import {
  Scene,
  PerspectiveCamera,
  AmbientLight,
  PointLight,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

global.THREE = global.THREE || THREE;

export default function ARScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [gl, setGl] = useState(null);
  const [camera, setCamera] = useState(null);
  const [scene, setScene] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const onContextCreate = async (gl) => {
    setGl(gl);

    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    setRenderer(renderer);

    const scene = new Scene();
    setScene(scene);

    const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    setCamera(camera);

    scene.add(new AmbientLight(0xffffff, 0.7));
    scene.add(new PointLight(0xffffff, 0.8));

    const loader = new GLTFLoader();
    try {
      const gltf = await loader.loadAsync('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb');
      gltf.scene.scale.set(1, 1, 1); // Adjust scale as needed
      gltf.scene.position.set(0, 0, 0); // Adjust position as needed
      scene.add(gltf.scene);
      setModel(gltf.scene);
      console.log('GLTF model loaded successfully!');
    } catch (error) {
      console.error('Error loading GLTF model:', error);
    }

    gl.createRenderLoop(() => {
      if (model) {
        model.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
      gl.endFrame();
    });
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back}>
        <GLView style={styles.glView} onContextCreate={onContextCreate} />
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  glView: {
    flex: 1,
  },
});