import { logoIconsList } from "../constants";

const LogoIcon = ({ icon }) => {
  return (
    <div className="flex-none flex-col-center marquee-item gap-3">
      <img src={icon.imgPath} alt={icon.name} loading="lazy" />
      <span className="text-sm text-white-50">{icon.name}</span>
    </div>
  );
};

const LogoShowcase = () => (
  <div className="md:my-20 my-10 relative section-shell">
    <p className="stack-strip-label">
      Tools I use to ship polished frontend work
    </p>
    <div className="gradient-edge" />
    <div className="gradient-edge" />

    <div className="marquee h-36 md:h-52">
      <div className="marquee-box md:gap-12 gap-5">
        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} />
        ))}

        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} />
        ))}
      </div>
    </div>
  </div>
);

export default LogoShowcase;
