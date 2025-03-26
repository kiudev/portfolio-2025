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
  let targetElement = null;

  if (scrollableContainer) {
    let hasScrolled = false;

    scrollableContainer.addEventListener("scroll", () => {
      const scrollPosition = scrollableContainer.scrollTop;

      if (scrollPosition > 300 && !hasScrolled) {
        hasScrolled = true;

        animations.forEach(({ targetSelector, animationProps, duration }) => {
          targetElement =
            typeof targetSelector === "string"
              ? document.querySelector(targetSelector)
              : targetSelector;

          if (!targetElement) {
            console.error(`Element with selector "${targetSelector}" not found when scrolling down`);
          }

          animate(targetSelector, animationProps, { duration });
        });
      } else if (scrollPosition < 300 && hasScrolled) {
        hasScrolled = false;

        animations.forEach(
          ({ targetSelector, reverseAnimationProps, reverseDuration }) => {
            targetElement = typeof targetSelector === "string" ? document.querySelector(targetSelector) : targetSelector;

            if (!targetElement) {
              console.error(`Element with selector "${targetSelector}" not found when scrolling up`);
            }

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
