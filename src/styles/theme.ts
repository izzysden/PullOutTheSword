const animations = {
  rainbow: `@keyframes rainbow {
    100%,
    0% {
      filter: drop-shadow(0 0 8px rgb(255, 0, 0));
    }
    8% {
      filter: drop-shadow(0 0 8px rgb(255, 127, 0));
    }
    16% {
      filter: drop-shadow(0 0 8px rgb(255, 255, 0));
    }
    25% {
      filter: drop-shadow(0 0 8px rgb(127, 255, 0));
    }
    33% {
      filter: drop-shadow(0 0 8px rgb(0, 255, 0));
    }
    41% {
      filter: drop-shadow(0 0 8px rgb(0, 255, 127));
    }
    50% {
      filter: drop-shadow(0 0 8px rgb(0, 255, 255));
    }
    58% {
      filter: drop-shadow(0 0 8px rgb(0, 127, 255));
    }
    66% {
      filter: drop-shadow(0 0 8px rgb(0, 0, 255));
    }
    75% {
      filter: drop-shadow(0 0 8px rgb(127, 0, 255));
    }
    83% {
      filter: drop-shadow(0 0 8px rgb(255, 0, 255));
    }
    91% {
      filter: drop-shadow(0 0 8px rgb(255, 0, 127));
    }
  }`,
  shake: `@keyframes shake {
    100%,
    0% {
      transform: translateX(0px) rotate(0deg);
    }
    25% {
      transform: translateX(-1px) rotate(-0.5deg);
    }
    50% {
      transform: translateX(0px) rotate(0deg);
    }
    75% {
      transform: translateX(1px) rotate(0.5deg);
    }
  }`,
  pull: `@keyframes pull {
    0% {
      transform: translateX(10px) translateY(0) rotate(0deg);
    }
    10% {
      transform: translateX(8px) translateY(0) rotate(-1deg);
    }
    20% {
      transform: translateX(12px) translateY(0) rotate(1deg);
    }
    30% {
      transform: translateX(6px) translateY(-2px) rotate(-1.5deg);
    }
    40% {
      transform: translateX(14px) translateY(-2px) rotate(1.5deg);
    }
    50% {
      transform: translateX(2px) translateY(-4px) rotate(-2deg);
    }
    60% {
      transform: translateX(18px) translateY(-4px) rotate(2deg);
    }
    70% {
      transform: translateX(-2px) translateY(-8px) rotate(-2.5deg);
    }
    80% {
      transform: translateX(22px) translateY(-8px) rotate(2.5deg);
    }
    90% {
      transform: translateX(-6px) translateY(-12px) rotate(-3deg);
    }
    100% {
      transform: translateX(26px) translateY(-12px) rotate(3deg);
    }
  }`,
  rotate: `@keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,
  show: `@keyframes show {
    0%,
    25% {
      transform: translateX(10px) translateY(0) rotate(0deg);
    }
    50% {
      transform: translateX(10px) translateY(-300px) rotate(0deg);
    }
    75% {
      transform: translateX(30px) translateY(-300px) rotate(180deg);
    }
  }`,
  popIn: `@keyframes popIn {
    0% {
      transform: translateY(400px) rotate(-5deg) scale(0.9);
    }
    70% {
      transform: translateY(-12.5px) rotate(-2.5deg) scale(1.1);
    }
    85% {
      transform: translateY(-12.5px) rotate(2.5deg) scale(1.1);
    }
    100% {
      transform: translateY(0) rotate(0) scale(1);
    }
  }
  
  animation: popIn 0.5s linear;
  `,
  popOut: `@keyframes popOut {
    0% {
      transform: translateY(0) scale(1);
    }
    25% {
      transform: translateY(-25px) scale(1.1);
    }
    100% {
      transform: translateY(400px) scale(0.9);
    }
  }

  animation: popOut 1s ease-in-out;
  `,
  fadeIn: `@keyframes fadeIn {
    from {
      visibility: visible;
      opacity: 0;
    }
    to {
      visibility: visible;
      opacity: 1;
    }
  }`,
  fadeOut: `@keyframes fadeOut {
    from {
      visibility: visible;
      opacity: 1;
    }
    to {
      visibility: visible;
      opacity: 0;
    }
  }`,
};

const commons = {
  boxShadow: `filter: drop-shadow(0 0 8px #000);`,
};

const theme = {
  animations,
  commons,
};

export default theme;
