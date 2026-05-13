const menuAssets = {
  background: "assets/textures/gui/menu/space_bg.png",
  logo: "assets/textures/gui/menu/logo.png",
  button: "assets/textures/gui/menu/button_base.png"
};

function createAuthScreen() {
  const container = document.createElement('div');
  container.id = 'auth-screen';
  container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#050505;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:monospace;color:#00ffff;z-index:1000;';

  const title = document.createElement('h1');
  title.innerText = "TENSION // INITIALIZING...";
  title.style.marginBottom = "30px";

  const userField = document.createElement('input');
  userField.type = "text";
  userField.placeholder = "USERNAME";
  userField.id = "reg-user";
  userField.style.cssText = 'background:#000;border:1px solid #00ffff;color:#fff;padding:10px;margin:5px;width:250px;outline:none;';

  const passField = document.createElement('input');
  passField.type = "password";
  passField.placeholder = "PASSWORD";
  passField.id = "reg-pass";
  passField.style.cssText = 'background:#000;border:1px solid #00ffff;color:#fff;padding:10px;margin:5px;width:250px;outline:none;';

  const enterBtn = document.createElement('button');
  enterBtn.innerText = "AUTHENTICATE";
  enterBtn.style.cssText = 'margin-top:20px;padding:10px 40px;background:#00ffff;color:#000;border:none;cursor:pointer;font-weight:bold;';

  enterBtn.onclick = async () => {
    const u = userField.value;
    const p = passField.value;
    if (u && p) {
      await saveUserData(u, p);
      container.remove();
      createMainMenu(u);
    }
  };

  container.append(title, userField, passField, enterBtn);
  document.body.appendChild(container);
}

async function saveUserData(username, password) {
  const response = await fetch('data/saves/player.json');
  const data = await response.json();
  
  data.accounts.push({
    username: username,
    password: password,
    created_at: Date.now()
  });

  data.current_session = {
    "tension:player_username": username,
    "is_logged_in": true
  };

  console.log("Saving to data/saves/player.json", data);
}

function createMainMenu(username) {
  const menu = document.createElement('div');
  menu.id = 'main-menu';
  menu.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:radial-gradient(circle, #0a0a1a 0%, #000000 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:999;';

  const welcome = document.createElement('div');
  welcome.innerText = `LOGGED IN AS: ${username}`;
  welcome.style.cssText = 'position:absolute;top:20px;left:20px;color:#555;font-family:monospace;font-size:12px;';

  const logo = document.createElement('div');
  logo.style.cssText = 'width:400px;height:100px;margin-bottom:50px;display:flex;align-items:center;justify-content:center;border:2px solid #fff;color:#fff;font-size:48px;font-weight:bold;letter-spacing:10px;';
  logo.innerText = "TENSION";

  const btnStyle = 'width:300px;padding:15px;margin:10px;background:rgba(255,255,255,0.05);border:1px solid #ffffff33;color:#fff;cursor:pointer;font-family:monospace;font-size:18px;text-align:left;transition:0.2s;';

  const joinBtn = document.createElement('button');
  joinBtn.innerText = "> JOIN SERVER";
  joinBtn.style.cssText = btnStyle;
  joinBtn.onmouseover = () => joinBtn.style.background = "rgba(255,255,255,0.2)";
  joinBtn.onmouseout = () => joinBtn.style.background = "rgba(255,255,255,0.05)";

  const createBtn = document.createElement('button');
  createBtn.innerText = "> CREATE SERVER";
  createBtn.style.cssText = btnStyle;
  createBtn.onmouseover = () => createBtn.style.background = "rgba(255,255,255,0.2)";
  createBtn.onmouseout = () => createBtn.style.background = "rgba(255,255,255,0.05)";

  const offlineBtn = document.createElement('button');
  offlineBtn.innerText = "> PLAY OFFLINE";
  offlineBtn.style.cssText = btnStyle;
  offlineBtn.onmouseover = () => offlineBtn.style.background = "rgba(255,255,255,0.2)";
  offlineBtn.onmouseout = () => offlineBtn.style.background = "rgba(255,255,255,0.05)";

  menu.append(welcome, logo, joinBtn, createBtn, offlineBtn);
  document.body.appendChild(menu);
}

window.onload = () => {
  createAuthScreen();
};
