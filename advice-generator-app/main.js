$adviceCard = document.querySelector('.advice-card');
$adviceId = $adviceCard.querySelector('.advice-id');
$advice = $adviceCard.querySelector('.advice');
$loaderButton = $adviceCard.querySelector('.generate-advice');

function startLoader() {
  $adviceCard.dataset.state = 'loading';
  $loaderButton.disabled = true;
}

function stopLoader() {
  $loaderButton.addEventListener('animationiteration', (e) => {
    $adviceCard.dataset.state = 'loaded';
    $loaderButton.disabled = false;
  }, {
    once: true
  });
}

async function loadAdvice() {
  startLoader();
  try {
    const res = await fetch('https://api.adviceslip.com/advice');
    const data = await res.json();
    $adviceId.innerHTML = data.slip.id;
    $advice.innerHTML = data.slip.advice;
  } catch (e) {
    console.log("Failed to fetch Advice");
  }
  stopLoader();
}

$loaderButton.addEventListener('click', () => {
  loadAdvice();
});