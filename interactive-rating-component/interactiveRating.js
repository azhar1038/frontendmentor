const $submitButton = document.querySelector(".rating-form button");
const $ratingProvided = document.querySelector(".rating-result span");
const $card = document.querySelector(".feedback-card");

$submitButton.addEventListener("click", (e)=>{
  e.preventDefault();
  const ratingForm = document.forms["rating-form"];
  var ratingFormData = new FormData(ratingForm);
  var rating = ratingFormData.get('rating');
  if (!rating) return;

  $ratingProvided.innerHTML = rating;
  $card.setAttribute("data-submitted", "true");
});