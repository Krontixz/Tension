const menuAssets = {
  background: "assets/textures/gui/menu/space_bg.png",
  logo: "assets/textures/gui/menu/TENSION.png",
  button: "assets/textures/gui/menu/button_base.png",
  buttonHover: "assets/textures/gui/menu/button_hover.png",
  inputField: "assets/textures/gui/menu/input_field.png"
};

let loadedMenuImages = {};
let activeScreen = "auth"; 
let hoveredButton = null;
let currentUsernameText = "";
let currentPasswordText = "";
let activeInputField = "username";

async function loadMenuTextures() {
  const promises = Object.entries(menuAssets).map(([key, path]) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        loadedMenuImages[key] = img;
        resolve();
      };
      img.onerror = () => {
        reject(`Failed to load: ${path}`);
      };
    });
  });

  await Promise.all(promises);
  startMenuLoop();
}

function startMenuLoop() {
  const canvas = document.getElementById("menuCanvas") || createMenuCanvas();
  const ctx = canvas.getContext("2d");

  function loop() {
    renderMenu(ctx);
    requestAnimationFrame(loop);
  }
  loop();
}

function createMenuCanvas() {
  const canvas = document.createElement("canvas");
  canvas.id = "menuCanvas";
  canvas.width = 1152;
  canvas.height = 648;
  canvas.style.cssText = "position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); background:#000; z-index:1000;";
  document.body.appendChild(canvas);
  setupMenuControls(canvas);
  return canvas;
}

function renderMenu(ctx) {
  ctx.clearRect(0, 0, 1152, 648);

  if (loadedMenuImages.background) {
    ctx.drawImage(loadedMenuImages.background, 0, 0, 1152, 648);
  }

  if (activeScreen === "auth") {
    if (loadedMenuImages.logo) {
      ctx.drawImage(loadedMenuImages.logo, 376, 50, 400, 100);
    }

    Object.keys(inputs).forEach(key => {
      const input = inputs[key];
      if (loadedMenuImages.inputField) {
        ctx.drawImage(loadedMenuImages.inputField, input.x, input.y, input.w, input.h);
      }
      
      ctx.fillStyle = activeInputField === key ? "#fff" : "#555";
      ctx.font = "14px monospace";
      ctx.fillText(input.label, input.x, input.y - 10);
      
      ctx.fillStyle = "#fff";
      ctx.font = "18px monospace";
      let displayValue = (key === "username") ? currentUsernameText : "*".repeat(currentPasswordText.length);
      ctx.fillText(displayValue, input.x + 10, input.y + 25);
    });

    renderButtons(ctx, buttons.auth);
  } else if (activeScreen === "main") {
    if (loadedMenuImages.logo) {
      ctx.drawImage(loadedMenuImages.logo, 376, 100, 400, 100);
    }
    renderButtons(ctx, buttons.mainMenu);
  }
}

function renderButtons(ctx, buttonList) {
  buttonList.forEach(btn => {
    const isHovered = hoveredButton === btn.id;
    const img = isHovered ? loadedMenuImages.buttonHover : loadedMenuImages.button;
    
    if (img) {
      ctx.drawImage(img, btn.x, btn.y, btn.w, btn.h);
    }

    ctx.fillStyle = isHovered ? "#fff" : "#00ffff";
    ctx.font = "20px monospace";
    ctx.textAlign = "center";
    ctx.fillText(btn.text, btn.x + (btn.w / 2), btn.y + (btn.h / 2) + 7);
    ctx.textAlign = "left";
  });
}

loadMenuTextures();
