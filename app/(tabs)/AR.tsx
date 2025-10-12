import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { GLView } from 'expo-gl';
import { Renderer, TextureLoader } from 'expo-three';
import {
  Scene,
  PerspectiveCamera,
  AmbientLight,
  PointLight,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three';

export default function ARScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [gl, setGl] = useState(null);
  const [camera, setCamera] = useState(null);
  const [scene, setScene] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [cube, setCube] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const onContextCreate = async (gl) => {
    setGl(gl);

    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    // Create a WebGLRenderer without a DOM element
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    setRenderer(renderer);

    const scene = new Scene();
    setScene(scene);

    const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 2;
    setCamera(camera);

    scene.add(new AmbientLight(0xffffff, 0.5));
    scene.add(new PointLight(0xffffff, 0.5));

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);
    scene.add(cube);
    setCube(cube);

    gl.createRenderLoop(() => {
      if (cube) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
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