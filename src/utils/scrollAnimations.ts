import { animate } from "motion";

interface AnimationProps {
  targetSelector: string | HTMLElement;
  animationProps: Record<string, any>;
  duration: number;
  reverseAnimationProps: Record<string, any>;
  reverseDuration: number;
}

interface ScrollAnimationProps {
  animations: AnimationProps[];
}

export function scrollAnimations({ animations }: ScrollAnimationProps) {
  const scrollableContainer = document.getElementById("scrollable-container");

  if (scrollableContainer) {
    let hasScrolled = false;

    scrollableContainer.addEventListener("scroll", () => {
      const scrollPosition = scrollableContainer.scrollTop;

      if (scrollPosition > 300 && !hasScrolled) {
        hasScrolled = true;

        animations.forEach(({ targetSelector, animationProps, duration }) => {
          animate(targetSelector, animationProps, { duration });
        });
      } else if (scrollPosition < 300 && hasScrolled) {
        hasScrolled = false;

        animations.forEach(
          ({ targetSelector, reverseAnimationProps, reverseDuration }) => {
            animate(targetSelector, reverseAnimationProps, {
              duration: reverseDuration,
            });
          },
        );
      }
    });
  } else {
    console.error("scrollableContainer not found");
  }
}
