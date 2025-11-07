const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const explic = document.querySelector('.explic');
const consilHTML = document.querySelector('.explic .consils');

const ANIM_DURATION = 800; // durée en ms -> doit correspondre aux durées CSS

let isAnimating = false;

nextButton.addEventListener('click', () => showSlider('next'));
prevButton.addEventListener('click', () => showSlider('prev'));

function showSlider(type) {
  if (isAnimating) return; // empêche les clics rapides
  isAnimating = true;

  // disable buttons pendant l'animation
  nextButton.style.pointerEvents = 'none';
  prevButton.style.pointerEvents = 'none';

  // retirer classes précédentes
  explic.classList.remove('next', 'prev');

  // ajouter la classe qui déclenche les keyframes (animate BEFORE DOM change)
  if (type === 'next') {
    explic.classList.add('next');
  } else {
    explic.classList.add('prev');
  }

  // attendre la fin de l'animation, puis réordonner le DOM
  setTimeout(() => {
    let items = document.querySelectorAll('.explic .consils .items');

    if (type === 'next') {
      // déplacer le premier élément à la fin
      if (items.length > 0) {
        consilHTML.appendChild(items[0]);
      }
    } else {
      // déplacer le dernier élément au début
      if (items.length > 0) {
        consilHTML.prepend(items[items.length - 1]);
      }
    }

    // enlever la classe d'animation
    explic.classList.remove('next', 'prev');

    // ré-activer boutons
    nextButton.style.pointerEvents = 'auto';
    prevButton.style.pointerEvents = 'auto';
    isAnimating = false;
  }, ANIM_DURATION);
}
