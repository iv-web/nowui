import './assets/stories.scss'

import React from 'react';
import { baseFonts } from '../theme';

class Stories extends React.Component {
  constructor(...args) {
    super(...args);
    this.renderKind = this.renderKind.bind(this);
    this.renderStory = this.renderStory.bind(this);
  }

  fireOnKind(kind) {
    const { onSelectStory } = this.props;
    if (onSelectStory) onSelectStory(kind, null);
  }

  fireOnStory(kind, story) {
    const { onSelectStory, selectedKind } = this.props;
    if (onSelectStory) onSelectStory(kind, story);
  }

  renderStory(kind, story) {
    const { selectedStory } = this.props;
    const props = {
      onClick: this.fireOnStory.bind(this, kind, story),
    };

    const storyClass = `nd-left-story ${story === selectedStory ? 'select' : ''}`

    return (
        <a key={story} title={`Open ${story}`} className={storyClass} onClick={props.onClick}>
          {story}
        </a>
    );
  }

  renderKind({ kind, stories }) {
    const { selectedKind } = this.props;

    const onClick = this.fireOnKind.bind(this, kind);

    const kindClass = `nd-left-kind ${kind===selectedKind ? 'select' : ''}`

    return (
      <dl key={kind}>
        <dt className={kindClass} title={`Open ${kind}`} onClick={onClick}>
            {kind}
        </dt>
          {
              <dd key={kind}>
                {stories.map((story) =>this.renderStory(kind, story))}
              </dd>
          }
      </dl>
    );
  }

  render() {
    const { stories } = this.props;

    return (
        <nav className="nd-left-nav">
            {stories.map(this.renderKind)}
      </nav>
    );
  }
}

export default Stories;
