const playButton = document.getElementById('playButton');
const radioPlayer = document.getElementById('radioPlayer');
const trackElement = document.getElementById('current-track'); // element, gdzie wyświetlamy tytuł
let playing = false;

// Obsługa przycisku play/pause
playButton.addEventListener('click', () => {
  if (!playing) {
    radioPlayer.play();
    playButton.innerHTML = '<i class="fa-solid fa-pause"></i>'; // ikona pauzy
  } else {
    radioPlayer.pause();
    playButton.innerHTML = '<i class="fa-solid fa-play"></i>'; // ikona play
  }
  playing = !playing;
});

// Funkcja pobierająca aktualnie grający utwór z Icecast
async function updateTrack() {
  try {
    // const res = await fetch('http://localhost:8000/status-json.xsl'); // lub Twój tunel Cl0oudflared
    const res = await fetch('https://utc-uniform-seq-atlanta.trycloudflare.com/status-json.xsl'); // lub Twój tunel Cloudflared
    const data = await res.json();

    // Dla pojedynczego źródła
    const source = data.icestats.source;
    const title = source?.title || 'Brak informacji o utworze';

    trackElement.textContent = `${title}`;
  } catch (err) {
    console.error('Błąd pobierania tracka:', err);
    trackElement.textContent = '🎵 Błąd połączenia z Icecast';
  }
}

// Odświeżaj co 5 sekund
setInterval(updateTrack, 5000);
updateTrack();
