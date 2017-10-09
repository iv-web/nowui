import './assets/index.scss'
import React from 'react';


const onDragStart = function () {
  document.body.classList.add('dragging');
};

const onDragEnd = function () {
  document.body.classList.remove('dragging');
};

class Layout extends React.Component {
  render() {
    const {
      goFullScreen, showLeftPanel, showDownPanel, downPanelInRight,
      downPanel, leftPanel, preview,
    } = this.props;

    return (
      <div className="nd-root-container">
        {
          showLeftPanel ? leftPanel() : null
        }
        <div className="nd-main-container">
          {
            preview()
          }
        </div>
      </div>
    );
  }
}

export default Layout;
