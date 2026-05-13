function renderMeetingScreen(players) {
  const container = document.getElementById('meeting-ui-container');
  container.style.width = "1152px";
  container.style.height = "648px";
  container.style.backgroundImage = `url(${assetList})`;

  players.forEach((player, index) => {
    const slot = document.createElement('div');
    slot.className = 'player-slot';
    slot.id = `player-${index}`;
    slot.style.backgroundImage = `url(${assetList[1]})`;

    const nameTag = document.createElement('div');
    nameTag.className = 'username-label';
    nameTag.innerText = player.username;
    
    const voteBtn = document.createElement('button');
    voteBtn.className = 'vote-button';
    voteBtn.style.backgroundImage = `url(${assetList})`;
    voteBtn.onclick = () => handleVote(index);

    slot.appendChild(nameTag);
    slot.appendChild(voteBtn);
    container.appendChild(slot);
  });
}
