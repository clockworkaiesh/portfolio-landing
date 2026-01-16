'use client';

import Dock from './Dock';
import { RiHome9Line, 
  RiRobot3Line, 
  RiBriefcase4Line, 
  RiCodeSSlashLine, 
  RiFolder3Line,
  RiMailUnreadLine } from "react-icons/ri";

export default function WebMenu({ onItemClick }) {
 const items = [
    { 
      icon: <RiHome9Line size={21}/>, 
      label: 'Home', 
      onClick: () => onItemClick && onItemClick(0) // Hero section
    },
    { 
      icon: <RiRobot3Line size={21} />, 
      label: 'About', 
      onClick: () => onItemClick && onItemClick(1) // About section
    },
     { 
      icon: <RiCodeSSlashLine size={21} />, 
      label: 'Skills', 
      onClick: () => onItemClick && onItemClick(2) // Skills section
    },
    { 
      icon: <RiBriefcase4Line size={21} />, 
      label: 'Work', 
      onClick: () => onItemClick && onItemClick(3) // Work section
    },
   
    { 
      icon: <RiFolder3Line size={21} />, 
      label: 'Projects', 
      onClick: () => onItemClick && onItemClick(4) // Projects section
    },
    { 
      icon: <RiMailUnreadLine size={21} />, 
      label: 'Contact', 
      onClick: () => onItemClick && onItemClick(5) // Contact section
    },
  ];

  return (
    <Dock 
      items={items}
      panelHeight={68}
      baseItemSize={50}
      magnification={70}
      className="bg-dark-default/20 backdrop-blur-md"
    />
  );
}
