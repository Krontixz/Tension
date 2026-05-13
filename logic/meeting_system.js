const assetList = [
  "assets/textures/gui/meeting/background.png",
  "assets/textures/gui/meeting/player_slot.png",
  "assets/textures/gui/meeting/timer_bar.png",
  "assets/textures/gui/meeting/vote_button.png",
  "assets/textures/gui/meeting/skip_button.png"
];

let loadedAssets = {};
let votingTime = 30;
let timerInterval = null;

async function initMeeting() {
  const response = await fetch('data/saves/player.json');
  const playerData = await response.json();
  const username = playerData["tension:player_username"];

  for (const path of assetList) {
    const img = new Image();
    img.src = path;
    await img.decode();
    loadedAssets[path] = img;
  }

  startTimer();
}

function startTimer() {
  const bar = document.getElementById('timer-bar');
  votingTime = 30;
  
  timerInterval = setInterval(() => {
    votingTime -= 0.1;
    const percentage = (votingTime / 30) * 100;
    bar.style.width = percentage + "%";
    
    if (votingTime <= 0) {
      clearInterval(timerInterval);
      endMeeting();
    }
  }, 100);
}

function handleVote(targetPlayerId) {
  const playerElement = document.getElementById(`player-${targetPlayerId}`);
  const nameLabel = playerElement.querySelector('.username-label');
  
  if (nameLabel) {
    nameLabel.remove();
  }
  
  lockVoting();
}

function lockVoting() {
  const buttons = document.querySelectorAll('.vote-button');
  buttons.forEach(btn => btn.disabled = true);
}

function endMeeting() {
  clearInterval(timerInterval);
  document.getElementById('meeting-overlay').style.display = 'none';
}
