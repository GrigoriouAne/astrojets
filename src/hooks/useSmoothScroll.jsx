import { useEffect } from "react";

const useSmoothScroll = (offset = 0) => {
  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const targetId = anchor.getAttribute("href").slice(1);
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        e.preventDefault();
        const elementPosition =
          targetEl.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [offset]);
};

export default useSmoothScroll;
