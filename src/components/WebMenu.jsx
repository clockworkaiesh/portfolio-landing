'use client';

import Dock from './Dock';
import { RiHome9Line, 
  RiRobot3Line, 
  RiBriefcase4Line, 
  RiCodeSSlashLine, 
  RiFolder3Line,
  RiMailUnreadLine } from "react-icons/ri";

export default function WebMenu({ onItemClick }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const items = [
    { icon: <RiHome9Line size={21}/>, label: 'Home', onClick: () => scrollTo('hero') },
    { icon: <RiRobot3Line size={21} />, label: 'About', onClick: () => scrollTo('about') },
    { icon: <RiCodeSSlashLine size={21} />, label: 'Skills', onClick: () => scrollTo('skills') },
    { icon: <RiBriefcase4Line size={21} />, label: 'Work', onClick: () => scrollTo('work') },
    { icon: <RiFolder3Line size={21} />, label: 'Projects', onClick: () => scrollTo('projects') },
    { icon: <RiMailUnreadLine size={21} />, label: 'Contact', onClick: () => scrollTo('contact') },
  ];

  return (
    <Dock 
      items={items}
      panelHeight={68}
      baseItemSize={50}
      magnification={70}
      className="bg-dark-default/20 backdrop-blur-md scale-[0.9] lg:scale-100"
    />
  );
}
