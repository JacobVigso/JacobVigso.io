const animationElements = document.querySelectorAll('.animation');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const element = entry.target;
      const animations = element.getAttribute('data-animations').split(',');
      let animationRules = '';

      animations.forEach(animation => {
        const [name, duration, timing, delay] = animation.trim().split(' ');
        const rule = `${name} ${duration} ${timing} ${delay} forwards`;

        if (animationRules) {
          animationRules += ', ';
        }

        animationRules += rule;
      });

      element.style.animation = animationRules;
      observer.unobserve(element);

      element.addEventListener('animationend', function(event) {
        if (event.animationName === 'fade-out') {
          element.remove();
        }
      });
    }
  });
});

animationElements.forEach(element => {
  observer.observe(element);
});

