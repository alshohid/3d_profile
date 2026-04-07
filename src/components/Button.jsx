const Button = ({ text, className, id, variant = "primary" }) => {
  const href = id ? `#${id}` : "#";

  return (
    <a href={href} className={`${className ?? ""} cta-wrapper`}>
      <div className={`cta-button ${variant === "secondary" ? "secondary" : ""} group`}>
        <div className="bg-circle" />
        <p className="text">{text}</p>
        <div className="arrow-wrapper">
          <img src="/images/arrow-down.svg" alt="arrow" />
        </div>
      </div>
    </a>
  );
};

export default Button;
