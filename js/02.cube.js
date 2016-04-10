var camera, orbitControls, scene, renderer;

init();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.x = -10;
  camera.position.y = 10;
  camera.position.z = 10;

  // create a renderer and set the size
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x00000000);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
  orbitControls.autoRotate = false;
  orbitControls.enableZoom = true;

  //    7-------6
  //   /|      /|
  //  / |     / |
  // 3--|----2  |
  // |  5----|--4
  // | /     | /
  // 0-------1

  var vertices = [];
  vertices.push(new THREE.Vector3 (0.0, 0.0, 0.0) ); // P0
  vertices.push(new THREE.Vector3 (1.0, 0.0, 0.0) ); // P1
  vertices.push(new THREE.Vector3 (1.0, 1.0, 0.0) ); // P2
  vertices.push(new THREE.Vector3 (0.0, 1.0, 0.0) ); // P3
  vertices.push(new THREE.Vector3 (1.0, 0.0, 1.0) ); // P4
  vertices.push(new THREE.Vector3 (0.0, 0.0, 1.0) ); // P5
  vertices.push(new THREE.Vector3 (1.0, 1.0, 1.0) ); // P6
  vertices.push(new THREE.Vector3 (0.0, 1.0, 1.0) ); // P7


  var faces = [];
  // Surface (P0, P1, P2, P3)
  faces.push( (new THREE.Face3 (0, 1, 2)) );
  faces.push( (new THREE.Face3 (0, 2, 3)) );
  // Surface (P1, P4, P6, P2)
  faces.push( (new THREE.Face3 (1, 4, 6)) );
  faces.push( (new THREE.Face3 (1, 6, 2)) );
  // Surface (P4, P5, P7, P6)
  faces.push( (new THREE.Face3 (4, 5, 7)) );
  faces.push( (new THREE.Face3 (4, 7, 6)) );
  // Surface (P0, P3, P7, P5)
  faces.push( (new THREE.Face3 (0, 3, 7)) );
  faces.push( (new THREE.Face3 (0, 7, 5)) );
  // Surface (P0, P5, P4, P1)
  faces.push( (new THREE.Face3 (0, 5, 4)) );
  faces.push( (new THREE.Face3 (0, 4, 1)) );
  // Surface (P2, P6, P7, P3)
  faces.push( (new THREE.Face3 (2, 6, 7)) );
  faces.push( (new THREE.Face3 (2, 7, 3)) );

  cubeGeometry = new THREE.Geometry();
  cubeGeometry.vertices = vertices;
  cubeGeometry.faces = faces;

  var cubeMaterial = new THREE.MeshBasicMaterial (
    {wireframe: true,
     color: 0xffffff} );

  var blue = new THREE.MeshBasicMaterial({color: 0x0000ff});
  var red = new THREE.MeshBasicMaterial({color: 0xff0000});

  var meshCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  var blueCube = new THREE.Mesh(cubeGeometry, blue);
  var redCube = new THREE.Mesh(cubeGeometry, red);
  blueCube.translateZ(2);
  redCube.translateX(2);

  scene.add(meshCube);
  scene.add(blueCube);
  scene.add(redCube);

  var axes = new THREE.AxisHelper(1.5);
  scene.add (axes);
}

function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame( animate );

  // required if controls.enableDamping = true,
  // or if controls.autoRotate = true
    orbitControls.update();
    //stats.update();
    render();
}
