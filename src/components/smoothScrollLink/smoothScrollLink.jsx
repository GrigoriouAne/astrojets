// SmoothScrollLink.jsx

const SmoothScrollLink = ({ to, offset = 0, children, ...props }) => {
  const handleClick = (e) => {
    e.preventDefault();

    const element = document.getElementById(to.replace("#", ""));
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export default SmoothScrollLink;
