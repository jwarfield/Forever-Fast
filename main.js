if ( ! Detector.webgl ) {

    Detector.addGetWebGLMessage();
    document.getElementById( 'container' ).innerHTML = "";

}

var container, stats;

var camera, controls, scene, renderer;

var mesh;

var worldWidth = 128, worldDepth = 128,
worldHalfWidth = worldWidth / 2, worldHalfDepth = worldDepth / 2;
// data = generateHeight( worldWidth, worldDepth );

var clock = new THREE.Clock();

const chunkWidth = 16;
//ex: Chunk coordinate (1,1,1) -> Absolute coordinates of (64, 64, 64).   
//For some (x,y,z) relative to a chunk, calculate the index of the coordinate.
function ridx(x, y, z) {
    return z+y*chunkWidth+x*chunkWidth**2;
}

//models
var pxGeometry = new THREE.PlaneBufferGeometry( 100, 100 );
pxGeometry.attributes.uv.array[ 1 ] = 0.5;
pxGeometry.attributes.uv.array[ 3 ] = 0.5;
pxGeometry.rotateY( Math.PI / 2 );
pxGeometry.translate( 50, 0, 0 );

var nxGeometry = new THREE.PlaneBufferGeometry( 100, 100 );
nxGeometry.attributes.uv.array[ 1 ] = 0.5;
nxGeometry.attributes.uv.array[ 3 ] = 0.5;
nxGeometry.rotateY( - Math.PI / 2 );
nxGeometry.translate( - 50, 0, 0 );

var pyGeometry = new THREE.PlaneBufferGeometry( 100, 100 );
pyGeometry.attributes.uv.array[ 5 ] = 0.5;
pyGeometry.attributes.uv.array[ 7 ] = 0.5;
pyGeometry.rotateX( - Math.PI / 2 );
pyGeometry.translate( 0, 50, 0 );

var nyGeometry = new THREE.PlaneBufferGeometry( 100, 100);
nyGeometry.attributes.uv.array[ 5 ] = 0.5;
nyGeometry.attributes.uv.array[ 7 ] = 0.5;
nyGeometry.rotateX( + Math.PI / 2 );
nyGeometry.translate( 0, -50, 0 );

var pzGeometry = new THREE.PlaneBufferGeometry( 100, 100 );
pzGeometry.attributes.uv.array[ 1 ] = 0.5;
pzGeometry.attributes.uv.array[ 3 ] = 0.5;
pzGeometry.translate( 0, 0, 50 );

var nzGeometry = new THREE.PlaneBufferGeometry( 100, 100 );
nzGeometry.attributes.uv.array[ 1 ] = 0.5;
nzGeometry.attributes.uv.array[ 3 ] = 0.5;
nzGeometry.rotateY( Math.PI );
nzGeometry.translate( 0, 0, -50 );

var pxTmpGeometry = new THREE.Geometry().fromBufferGeometry( pxGeometry );
var nxTmpGeometry = new THREE.Geometry().fromBufferGeometry( nxGeometry );
var pyTmpGeometry = new THREE.Geometry().fromBufferGeometry( pyGeometry );
var nyTmpGeometry = new THREE.Geometry().fromBufferGeometry( nyGeometry );
var pzTmpGeometry = new THREE.Geometry().fromBufferGeometry( pzGeometry );
var nzTmpGeometry = new THREE.Geometry().fromBufferGeometry( nzGeometry );

var stoneTexture = new THREE.TextureLoader().load( 'textures/minecraft/atlas.png' );
stoneTexture.magFilter = THREE.NearestFilter;
stoneTexture.minFilter = THREE.LinearMipMapLinearFilter;

var unmergedChunks = [];
var chunks = [];

data = init();
animate();

function init() {

    container = document.getElementById( 'container' );

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 20000 );
    camera.position.x = 0;
    camera.position.z = 0;
    camera.position.y = 0;

    controls = new THREE.FirstPersonControls( camera );

    controls.movementSpeed = 1000;
    controls.lookSpeed = 0.125;
    controls.lookVertical = true;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xbfd1e5 );

    // sides

    // BufferGeometry cannot be merged yet.
    // var tmpGeometry = new THREE.Geometry();          

    //Merge some chunk into the global mesh at some chunk coordinate

    var chunkWorker = new Worker("generateChunk.js");
    chunkWorker.addEventListener('message', function(e) {
        unmergedChunks.push(e.data);
        console.log("Chunk generated")
      }, false);

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            for (let k = 0; k < 8; k++) {
                chunkWorker.postMessage([i,j,k])
            }
        }
    }
    
    
    // mergeChunk(0,0,0, generateChunk(0,0,0));
    // mergeChunk(1,0,0, generateChunk(1,0,0));
    // mergeChunk(-1,0,0, generateChunk(1,0,0));
    // mergeChunk(0,0,1, generateChunk(1,0,0));
    // mergeChunk(0,0,-1, generateChunk(1,0,0));
    
    // let startx = worldHalfWidth;
    // let startz = worldHalfDepth;
    // let starty= getY( worldHalfWidth, worldHalfDepth ) * 100 + 1000;
    
    // var testMatrix = new THREE.Matrix4();
    // testMatrix.makeTranslation(200,0,100)

    // tmpGeometry.merge( pyTmpGeometry, testMatrix ); //top
    // tmpGeometry.merge( nyTmpGeometry, testMatrix ); //bottom
    // tmpGeometry.merge( pxTmpGeometry, testMatrix );
    // tmpGeometry.merge( nxTmpGeometry, testMatrix );
    // tmpGeometry.merge( pzTmpGeometry, testMatrix );
    // tmpGeometry.merge( nzTmpGeometry, testMatrix );

    var ambientLight = new THREE.AmbientLight( 0xcccccc );
    scene.add( ambientLight );

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set( 1, 1, 0.5 ).normalize();
    scene.add( directionalLight );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    container.innerHTML = "";

    container.appendChild( renderer.domElement );

    stats = new Stats();
    container.appendChild( stats.dom );

    window.addEventListener( 'resize', onWindowResize, false );
}

function addChunkToScence(cx, cy, cz, data) {
    var matrix = new THREE.Matrix4(); 
    var tmpGeometry = new THREE.Geometry();
    
    cx *= chunkWidth;
    cy *= chunkWidth;
    cz *= chunkWidth;
    for (let i = 0; i < chunkWidth; i++) {
        for (let j = 0; j < chunkWidth; j++) {
            for (let k = 0; k < chunkWidth; k++) {
                if (data[ridx(i,j,k)] == 1) {
                    matrix.makeTranslation((i+cx)*100, (j+cy)*100, (k+cz)*100);  
                    if (k-1 < 0 || data[ridx(i,j,k-1)] == 0) {
                        tmpGeometry.merge( nzTmpGeometry, matrix );     
                    }
                    if (k+1 >= chunkWidth || data[ridx(i,j,k+1)] == 0) {
                        tmpGeometry.merge( pzTmpGeometry, matrix );
                    }
                    if (j-1 < 0 || data[ridx(i,j-1,k)] == 0) {
                        tmpGeometry.merge( nyTmpGeometry, matrix );
                    }
                    if (j+1 >= chunkWidth || data[ridx(i,j+1,k)] == 0) {
                        tmpGeometry.merge( pyTmpGeometry, matrix );
                    }
                    if (i-1 < 0 || data[ridx(i-1,j,k)] == 0) {
                        tmpGeometry.merge( nxTmpGeometry, matrix );
                    }
                    if (i+1 >= chunkWidth || data[ridx(i+1,j,k)] == 0) {
                        tmpGeometry.merge( pxTmpGeometry, matrix );
                    }
                }
            }
        }
    }
    console.log("added chunk")

    var geometry = new THREE.BufferGeometry().fromGeometry( tmpGeometry );
    geometry.computeBoundingSphere();
    var mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { map: stoneTexture } ) );
    scene.add( mesh );
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    controls.handleResize();

}
//

function animate() {

    requestAnimationFrame( animate );
    render();
    stats.update();

}

function render() {
    controls.update( clock.getDelta() );
    if (unmergedChunks.length != 0) {
         let data = unmergedChunks.pop()
         let cxyz = data[0]
         let chunk = data[1]
         addChunkToScence(cxyz[0],cxyz[1], cxyz[2], chunk);
    }
    renderer.render( scene, camera );
}   













function noise(x, y, z) {
    var n = tooloud.Worley.Euclidean(x, y, z);
    return Math.floor(255 * (n[2]*n[0]));
} 

//Generate a chunk at some chunk coordinate
const chunkArraySize = 4*chunkWidth**3;
function generateChunk(cx, cy, cz) {
    cx *= chunkWidth;
    cy *= chunkWidth;
    cz *= chunkWidth;
    let buffer = new ArrayBuffer(chunkArraySize);
    let float32View = new Float32Array(buffer);
    for (let i = 0; i < chunkWidth; i++) {
        for (let j = 0; j < chunkWidth; j++) {
            for (let k = 0; k < chunkWidth; k++) {
                let v = 0;
                if (noise((i+cx)*.05,(j+cy)*.05,(k+cz)*.05) > 40) {
                    v = 1
                }
                float32View[ridx(i,j,k)] = v;
            }
        }
    }
    return [[cx, cy, cz], float32View];
}