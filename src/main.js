const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometries = [
  new THREE.BoxGeometry(),
  new THREE.ConeGeometry(0.5, 1, 32),
  new THREE.CylinderGeometry(0.5, 0.5, 1, 32),
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.TorusGeometry(0.5, 0.2, 16, 100)
];

const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff];
const objects = [];

// Create materials and meshes
geometries.forEach((geo, i) => {
  const material = new THREE.MeshBasicMaterial({ color: colors[i] });
  const mesh = new THREE.Mesh(geo, material);
  
  // Position geometries at different heights
  mesh.position.y = i * 1.5 - 3; // spread vertically
  scene.add(mesh);
  objects.push(mesh);
});

// Camera positioning
camera.position.z = 5;

// Variables for movement
let direction = 1;
const speed = 0.05;

// Animation function
function animate() {
  requestAnimationFrame(animate);
  
  // Move geometries left to right and bounce
  objects.forEach(obj => {
    obj.position.x += direction * speed;

    // Reverse direction if hitting bounds
    if (obj.position.x > 4 || obj.position.x < -4) {
      direction *= -1;
    }
  });

  renderer.render(scene, camera);
}

// Start animation
animate();
