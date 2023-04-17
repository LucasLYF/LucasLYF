import * as THREE from "../../../../js/Threejs/build/three.module.js";
import { OrbitControls } from "../../../../js/Threejs/examples/jsm/controls/OrbitControls.js";
import { CoordinateAxesRenderer } from "../../../../js/CoordinateAxesRenderer.js";
export class lcvScene {
    scene;
    renderer;
    axesRender;
    camera;
    constructor(parent) {
        /*
        * 获取对象在窗口中的几何信息
        */
        var computedStyle = document.defaultView.getComputedStyle(parent, null);
        var width = parseInt(computedStyle.width); //parseInt取整数,computedStyle.width返回的值带有px
        /*
        * 创建场景对象
        */
        this.scene = new THREE.Scene();
        let ambientLight = new THREE.AmbientLight(0xffffff, 0.2);//环境光
        this.scene.add(ambientLight);
        let directLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directLight.position.set(200,-200,200);
        this.scene.add(directLight);//平行光
        /*
        * 设置相机
        */
        var k = 2; //窗口宽高比
        var near = 0.1; //近端面
        var far = 20000; //远端面
        var fov = 50; //相机垂直方向角度
        //创建相机对象
        //var camera = new THREE.OrthographicCamera(-far * k, far * k, far, -far, near, far);//
        this.camera = new THREE.PerspectiveCamera(fov, k, near, far);//透视投影
        this.camera.up.x = 0;
        this.camera.up.y = 0;
        this.camera.up.z = 1;
        this.camera.position.set(2000, -2000, 4000); //设置相机位置
        this.camera.lookAt(0,0,500); //设置相机方向(指向的场景对象)
        /*
        * 创建渲染器对象
        */
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        //this.renderer.setClearColor(0xFFFFFF); //设置背景颜色
        this.renderer.setSize(width, width / 2); //设置渲染区域尺寸
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.outputEncoding = THREE.sRGBEncoding; //不加这句代码模型会很暗
        this.renderer.shadowMap.enabled = true;
        //renderer.autoClear = false; //关闭自动清除，使多图层渲染有效
        this.axesRenderer = new CoordinateAxesRenderer(width / 15, width / 15);
        this.axesRenderer.setHostRenderer(this.renderer);
        this.axesRenderer.setHostCamera(this.camera);
        this.axesRenderer.domElement().style.position = 'absolute';//重叠渲染器
        this.axesRenderer.domElement().style.bottom = 0;
        /*
        * 控制器
        */
        var control = new OrbitControls(this.camera, this.renderer.domElement);
        /*
        * 执行渲染操作  
        */
        parent.appendChild(this.renderer.domElement);
        parent.appendChild(this.axesRenderer.domElement());
        window.addEventListener('resize', () => { //根据窗口刷新大小
            this.camera.aspect = 2;
            this.camera.updateProjectionMatrix();
            var myP = document.getElementById("render"); //获取父对象对象
            var computedStyle = document.defaultView.getComputedStyle(myP, null);
            var width = parseInt(computedStyle.width);
            this.renderer.setSize(width, width / 2);
            this.renderer.setPixelRatio(window.devicePixelRatio);
        });
        this.animate();
    }
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
        this.axesRenderer.render();
    };
    /*
    * 创建网格地面
    */
    addGround(width,resolution) {
        var gridHelper = new THREE.GridHelper(width, resolution, 0x000000, 0x000000);
        gridHelper.rotation.x = 0.5*Math.PI;
        this.scene.add(gridHelper);
        var planeGeometry = new THREE.PlaneGeometry(width, width);
        var plane = new THREE.Mesh(planeGeometry);
        this.scene.add(plane);
    }
    add(object) {
        this.scene.add(object);
    }
}