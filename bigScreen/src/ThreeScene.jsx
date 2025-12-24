import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // 创建 Three.js 场景和渲染器
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    // 设置渲染器的大小
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 将渲染器的输出添加到 DOM 元素中
    const canvasElement = canvasRef.current;
    canvasElement.appendChild(renderer.domElement);
    const camera = new THREE.PerspectiveCamera(30, 1, 200, 4000);
    // 添加 Three.js 相机和物体等内容，进行场景渲染的配置

    // 渲染场景
    renderer.render(scene, camera);

    // 清理函数
    return () => {
      // 销毁场景和渲染器等资源
      renderer.dispose();
      scene.dispose();
    };
  }, []);

  return <div ref={canvasRef} />;
};

export default ThreeScene;
