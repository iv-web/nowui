import './assets/header.scss'

import React from 'react';

const Header = ({ openShortcutsHelp, name, url }) => (
  <div className="nd-head-wrapper">
      {
        null &&  <button className="nd-head-shortcut" onClick={openShortcutsHelp}>⌘</button>
      }
      <a href="/">
        <h3 className="nd-head-logo">
            NowUI
        </h3>
      </a>
  </div>
);

export default Header;
