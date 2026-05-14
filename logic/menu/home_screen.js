function renderMenu(ctx) {
  ctx.clearRect(0, 0, 1152, 648);

  if (loadedMenuImages.background) {
    ctx.drawImage(loadedMenuImages.background, 0, 0, 1152, 648);
  }

  if (activeScreen === "auth") {
    ctx.fillStyle = "#00ffff";
    ctx.font = "32px monospace";
    ctx.textAlign = "center";
    ctx.fillText("TENSION // INITIALIZING...", 576, 150);

    Object.keys(inputs).forEach(key => {
      const input = inputs[key];
      if (loadedMenuImages.inputField) {
        ctx.drawImage(loadedMenuImages.inputField, input.x, input.y, input.w, input.h);
      }
      ctx.fillStyle = activeInputField === key ? "#fff" : "#555";
      ctx.font = "14px monospace";
      ctx.textAlign = "left";
      ctx.fillText(input.label, input.x, input.y - 10);
      
      ctx.fillStyle = "#fff";
      ctx.font = "18px monospace";
      let text = (key === "username") ? currentUsernameText : "*".repeat(currentPasswordText.length);
      ctx.fillText(text, input.x + 10, input.y + 25);
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
  });
}

function setupMenuControls(canvas) {
  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    
    hoveredButton = null;
    const currentButtons = activeScreen === "auth" ? buttons.auth : buttons.mainMenu;
    
    currentButtons.forEach(btn => {
      if (mx > btn.x && mx < btn.x + btn.w && my > btn.y && my < btn.y + btn.h) {
        hoveredButton = btn.id;
      }
    });
  });

  canvas.addEventListener("mousedown", (e) => {
    if (activeScreen === "auth") {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      Object.keys(inputs).forEach(key => {
        const input = inputs[key];
        if (mx > input.x && mx < input.x + input.w && my > input.y && my < input.y + input.h) {
          activeInputField = key;
        }
      });

      if (hoveredButton === "authenticate") {
        if (currentUsernameText && currentPasswordText) {
          authenticateUser();
        }
      }
    }
  });

  window.addEventListener("keydown", (e) => {
    if (activeScreen === "auth") {
      if (e.key === "Backspace") {
        if (activeInputField === "username") currentUsernameText = currentUsernameText.slice(0, -1);
        else currentPasswordText = currentPasswordText.slice(0, -1);
      } else if (e.key.length === 1) {
        if (activeInputField === "username") currentUsernameText += e.key;
        else currentPasswordText += e.key;
      }
    }
  });
}

async function authenticateUser() {
  const response = await fetch('data/saves/player.json');
  const data = await response.json();
  
  data.accounts.push({
    username: currentUsernameText,
    password: currentPasswordText,
    created_at: Date.now()
  });

  data.current_session = {
    "tension:player_username": currentUsernameText,
    "is_logged_in": true
  };

  activeScreen = "main";
}

initMenuSystem();
