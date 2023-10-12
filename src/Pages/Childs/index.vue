/**
* @name: index
* @author: DELL
* @date: 2022/10/24 14:11
* @description：index
* @update: 2022/10/24 14:11
*/
<!-- 页面 -->
<template>
  <div class="content" id="contentHook">
    <Header></Header>
    <Left v-if="isShow"></Left>
    <Right v-if="isShow"></Right>
    <DialogC :visible="visible" :type="type"></DialogC>
    <div class="rest" @click="rest"></div>
  </div>
</template>

<script>
import * as THREE from 'three' // 三维
import * as TWEEN from '@tweenjs/tween.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'; // 控制器
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import Header from '@/components/Header/index';
import Left from './left';
import Right from './right';
import DialogC from './dialog';

export default {
  data() {
    return {
      scene: null,
      light: null,
      camera: null,
      renderer: null,
      controls: null,
      mixer2: null,
      clock2: null,
      visible: false,
      type: 'danger',
      isShow: false,
      mesGroup: []
    };
  },

  components: {
    Header,
    Left,
    Right,
    DialogC
  },

  computed: {},

  mounted() {
    this.init();
  },
  methods: {
    rest() {
      this.controls.reset();
    },
    async init() {
      this.clock2 = new THREE.Clock(); // 用于clock.getDelta()
      await this.initScene();
      await this.initLight();
      window.addEventListener('resize', this.onWindowResize, false);//添加窗口监听事件（resize-onresize即窗口或框架被重新调整大小）
      this.addModels();
      await this.initCamera();
      await this.initRenderer();
      await this.initControls();
      this.animate();
      window.addEventListener('click', this.onMouseClick, false);
    },
    initScene() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x000000);
      // const axes = new THREE.AxesHelper(20);
      // axes.position.set(0, 0, 0);
      // this.scene.add(axes);
    },
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
      this.camera.position.x = 10;
      this.camera.position.y = 5;
      this.camera.position.z = 10;
      this.camera.position.set(10, 5, 10);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      const camera = this.camera;
      const tweenCamera1 = new TWEEN.Tween({x: -35, y: 25, z: 30, lookAtX: 0, lookAtY: 0, lookAtZ: 0})
          .to({x: 10, y: 5, z: 10, lookAtX: 0, lookAtY: 0, lookAtZ: 0}, 1000);
      const updateCamera = function (object) {
        camera.position.set(object.x, object.y, object.z);
        camera.lookAt(new THREE.Vector3(object.lookAtX, object.lookAtY, object.lookAtZ))
      }
      tweenCamera1.onUpdate(updateCamera);
      tweenCamera1.start();
      tweenCamera1.onComplete(() => {
        this.isShow = true;
      })
    },
    initControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.minDistance = 10;
      this.controls.maxDistance = 20;
      this.controls.autoRotate = false;
      this.controls.minPolarAngle = 0;
      this.controls.maxPolarAngle = Math.PI / 2;
      this.controls.enableDamping = false;
      this.controls.autoRotate = false;
      this.controls.minPolarAngle = 0;
      this.controls.maxPolarAngle = Math.PI / 2;
      this.controls.enableDamping = false;
      this.controls.autoRotateSpeed = -0.5;
      this.controls.autoRotateSpeed = -0.5;
      this.controls.rotateSpeed = 0.5;
      this.controls.zoomSpeed = 0.8;
      // controls.minAzimuthAngle = Math.PI * (100 / 180);
      // controls.maxAzimuthAngle = Math.PI * (100 / 180);
      this.controls.target.set(0, 0, -0.2);
      this.controls.update();
    },
    initLight() {
      const light = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
      const dirLight = new THREE.DirectionalLight(0xffffff, 1);//平行光
      this.scene.add(light);
      this.scene.add(dirLight);
    },
    initRenderer() {
      this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.physicallyCorrectLights = false;
      this.renderer.setClearColor(new THREE.Color(0xFFFFFF))
      document.querySelector("#contentHook").appendChild(this.renderer.domElement);
      this.renderer.render(this.scene, this.camera);
    },
    addModels() {
      const gltfLoader = new GLTFLoader();
      const dracoLoader = new DRACOLoader()
      // dracoLoader.setDecoderPath('./draco/')
      // dracoLoader.preload()
      gltfLoader.setDRACOLoader(dracoLoader);
      gltfLoader.load('./models/newfan1027-g.glb', (objects) => {
        let model = objects.scene;
        model.position.set(0, -5.5, 0);
        model.scale.set(2.5, 2.5, 2.5);
        // model.scale.set(3, 3, 3);
        this.scene.add(model);
        const { query: { a, b } } = this.$route;
        model.traverse((object) => {
          if (object.isMesh) {
            object.castShadow = true;
          }
          object.isGroup && console.log(object.name, object)
          if (object.isGroup && a === '1' && b === '1' && ['doterroA', 'doterroB'].includes(object.name)) {
              object.visible = false;
          } else if (object.isGroup && !a && !b && ['doterroA', 'doterroB'].includes(object.name)) {
            object.visible = false;
          } else if (object.isGroup && a === '1' && !b && ['doterroA', 'doterroB'].includes(object.name)) {
            object.visible = false;
          } else if (object.isGroup && !a && b === '1' && ['doterroA', 'doterroB'].includes(object.name)) {
            object.visible = false;
          } else if (object.isGroup &&  a === '2' && b === '1' && ['dotnormA', 'doterroB'].includes(object.name)) {
            object.visible = false;
          } else if (object.isGroup &&  a === '1' && b === '2' && ['doterroA', 'dotnormB'].includes(object.name)) {
            object.visible = false;
          } else if (object.isGroup &&  a === '2' && b === '2' && ['dotnormA', 'dotnormB'].includes(object.name)) {
            object.visible = false;
          }
          object.isGroup && console.log(object.name, object.visible)
        });
        const animations = objects.animations;
        this.mixer2 = new THREE.AnimationMixer(model);
        animations.forEach((animation) => {
          this.mixer2.clipAction(animation).play();
        })
        this.render();
      })
    },

    render() {
      this.renderer.render(this.scene, this.camera);
    },
    animate() {
      requestAnimationFrame(this.animate);
      if (this.mixer2) {
        this.mixer2.update(this.clock2.getDelta());
      }
      TWEEN.update();
      this.render();
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.render();
    },
    onMouseClick(e) {
      e.preventDefault();
      this.visible = false;
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, this.camera);
      const intersects = raycaster.intersectObjects(this.scene.children);
      if (!intersects.length) return;
      const sA = ['立方体013', '圆环001', '圆环022_1', '立方体013_1'];
      const obj = intersects.find((item) => sA.includes(item.object.name) && item.object.visible && item.object.parent.visible );
      console.log(obj);
      if (obj) {
        const {object: {name}} = obj;
        this.visible = true;
        if (name === '立方体013' || name === '立方体013_1') {
          this.type = 'danger';
        }
        if (name === '圆环001' || name === '圆环022_1') {
          this.type = 'success';
        }
        return;
      }
    }
  },
  beforeDestroy() {
    window && window.removeEventListener('click', this.onMouseClick);
    window && window.removeEventListener('resize', this.onWindowResize);
  },
  name: "index",
};
</script>

<style lang='scss' scoped>
.content {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: #000000;
  .rest{
    position: absolute;
    width: 64px;
    height: 64px;
    left: 1419px;
    top: 133px;
    background: url(~@/assets/images/rest.png) no-repeat center;
    background-size: 100% 100%;
    cursor: pointer;
  }
}
</style>
