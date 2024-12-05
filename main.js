// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Create rotating objects
const objects = [];
let isHovered = false; // Track hover state

// Cylinder (replacing the sphere)
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 32); // Cylinder geometry
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0xff6347 }); // Tomato color
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.x = -4;
scene.add(cylinder);
objects.push(cylinder);

// Cube
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x3498db }); // Blue color
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = 0;
scene.add(cube);
objects.push(cube);

// Pyramid (Tetrahedron)
const pyramidGeometry = new THREE.TetrahedronGeometry(1.5);
const pyramidMaterial = new THREE.MeshStandardMaterial({ color: 0x2ecc71 }); // Green color
const pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
pyramid.position.x = 4;
scene.add(pyramid);
objects.push(pyramid);

// Position the camera
camera.position.z = 7;

// Handle window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Add raycaster and mouse vector
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Detect hover
function onMouseMove(event) {
  // Calculate mouse position in normalized device coordinates (-1 to +1 for both axes)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the raycaster with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // Check if the mouse is hovering over any object
  const intersects = raycaster.intersectObjects(objects);

  if (intersects.length > 0) {
    isHovered = true; // Mouse is hovering
  } else {
    isHovered = false; // Mouse is not hovering
  }
}

// Add event listener for mouse move
window.addEventListener('mousemove', onMouseMove);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  if (!isHovered) {
    // Rotate the objects if not hovered
    objects.forEach((obj) => {
      obj.rotation.x += 0.01;
      obj.rotation.y += 0.01;
    });
  }

  renderer.render(scene, camera);
}
animate();
