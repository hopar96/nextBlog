'use client';

import styles from '../styles/navigation.module.css';
import { log } from 'console';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function Header() {
  const path = usePathname();

  return (
    <header className="container full-container w-full text-sm   py-4">
      <div className="w-full">
        <nav className="w-full flex items-center justify-between" aria-label="Global">
          <ul className="icon-nav flex items-center gap-4">
            <li className="relative xl:hidden">
              <a
                className="text-xl  icon-hover cursor-pointer text-heading"
                id="headerCollapse"
                data-hs-overlay="#application-sidebar-brand"
                aria-controls="application-sidebar-brand"
                aria-label="Toggle navigation">
                <GiHamburgerMenu />
                <i className="ti ti-menu-2 relative z-1"></i>
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-4">
            {/* <a href="#" className="btn font-medium hover:bg-blue-700 py-2" aria-current="page">Download Free</a> */}
          </div>
        </nav>
      </div>
    </header>
  );
}
