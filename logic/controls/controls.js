const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
  q: false,
  r: false
};

const mouse = {
  x: 0,
  y: 0,
  leftClick: false
};

window.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (keys.hasOwnProperty(key)) {
    keys[key] = true;
  }
});

window.addEventListener('keyup', (e) => {
  const key = e.key.toLowerCase();
  if (keys.hasOwnProperty(key)) {
    keys[key] = false;
  }
});

window.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('mousedown', (e) => {
  if (e.button === 0) {
    mouse.leftClick = true;
    handleInteraction();
  }
});

window.addEventListener('mouseup', (e) => {
  if (e.button === 0) {
    mouse.leftClick = false;
  }
});

function updateMovement(player) {
  let speed = keys.q ? 0.2 : 0.1;
  let currentAnimation = "animation.player.walk_right";

  if (keys.w) player.z -= speed;
  if (keys.s) player.z += speed;
  if (keys.a) player.x -= speed;
  if (keys.d) player.x += speed;

  if (keys.w || keys.s || keys.a || keys.d) {
    playAnimation(currentAnimation, keys.q ? 1.5 : 1.0);
  } else {
    stopAnimation();
  }

  if (keys.r) {
    checkEmergencyButton(player);
  }
}

function handleInteraction() {
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    const object = intersects.object;
    if (object.name === "cargo_box") {
      selectObject(object);
    }
  }
}

function checkEmergencyButton(player) {
  const buttonPos = { x: 0, y: 0, z: 0 }; 
  const dist = Math.sqrt(
    Math.pow(player.x - buttonPos.x, 2) +
    Math.pow(player.z - buttonPos.z, 2)
  );

  if (dist < 1.5) {
    initMeeting();
  }
}
