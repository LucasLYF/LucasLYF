/*
* 自定义坐标轴对象
*/
import * as THREE from "../../../../js/Threejs/build/three.module.js";
export default class CoordinateAxes extends THREE.Object3D {
    name = 'COORDINATE_AXES'
    AXIS_LENGTH = 150;
    // follows right-hand coordinate system
    AXIS_COLOR_X = 0xff0000; // red
    AXIS_COLOR_Y = 0x00ff00; // green
    AXIS_COLOR_Z = 0x0000ff; // blue
    constructor () {
        super();
        const origin = new THREE.Vector3(0, 0, 0);
        const axisX = new THREE.Vector3(1, 0, 0);
        const axisY = new THREE.Vector3(0, 1, 0);
        const axisZ = new THREE.Vector3(0, 0, 1);
        const arrowX = new THREE.ArrowHelper(axisX, origin, this.AXIS_LENGTH, this.AXIS_COLOR_X, this.AXIS_LENGTH / 5, this.AXIS_LENGTH / 10);
        const arrowY = new THREE.ArrowHelper(axisY, origin, this.AXIS_LENGTH, this.AXIS_COLOR_Y, this.AXIS_LENGTH / 5, this.AXIS_LENGTH / 10);
        const arrowZ = new THREE.ArrowHelper(axisZ, origin, this.AXIS_LENGTH, this.AXIS_COLOR_Z, this.AXIS_LENGTH / 5, this.AXIS_LENGTH / 10);
        this.add(arrowX, arrowY, arrowZ);
    };
};
/**
* This renderer monitors the host renderer's camera, and keeps a coordinate axes
* the same direction as host renderer's
*/
export class CoordinateAxesRenderer {
    hostRenderer;
    hostCamera;
    coordinateAxes;
    camera;
    scene;
    renderer;
    ambientLight;
    height = 200; // size of render area
    width = 200;
    constructor (width, height) {
        this.width = width || this.width;
        this.height = height || this.height;
        this.init();
    };
    init () {
        this.initRenderer();
        this.initScene();
        this.animate();
    };
    initRenderer () {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
    };
    initScene () {
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-200 * 1, 200 * 1, 200, -200, 0.1, 2000);
        this.camera.position.set(200, 300, 200);
        this.camera.lookAt(this.scene.position);
        this.scene.add(this.camera);
        // this.ambientLight = new THREE.AmbientLight(0xcccccc, 1)
        // this.scene.add(this.ambientLight)
        this.coordinateAxes = new CoordinateAxes();
        this.scene.add(this.coordinateAxes);
    };
    render () {
        if (this.renderer && this.scene && this.camera) {
        this.update();
        this.renderer.render(this.scene, this.camera);
        }
    };
    animate () {
        requestAnimationFrame(this.animate.bind(this));
        this.render();
    };
    setSize (width, height) {
        this.renderer.setSize(this.width, this.height);
    }
    setHostRenderer (renderer) {
        this.hostRenderer = renderer;
        this.update();
    };
    setHostCamera (camera){
        this.hostCamera = camera;
        this.update();
    };
    domElement (){
        return this.renderer.domElement;
    };
    update () {
        if (!this.hostRenderer || !this.hostCamera) {
            return;
        }
        const camera = this.hostCamera;
        if (camera) {
        const target = new THREE.Vector3();
        camera.getWorldDirection(target);
        const up = camera.up;
        this.updateCameraDirection(target, up);
        }
    };
    /**
    * Update axes according to camera direction.
    * Camera's direction is the only input factor for this class. It always look at the origin.
    * @param direction
    */
    updateCameraDirection (direction, up) {
        if (!this.camera || !direction) {
            return;
        }
        direction.normalize();
        const distanceFactor = 200; // keep camera a little farer, so it looks better
        const centerDelta = 0; // put the lookAt point to be in the first quadrant
        this.camera.position.set(-direction.x * distanceFactor + centerDelta, -direction.y * distanceFactor + centerDelta, -direction.z * distanceFactor + centerDelta);
        this.camera.lookAt(centerDelta, centerDelta, centerDelta); // it always looks at the origin
        this.camera.up = up;
    };
};