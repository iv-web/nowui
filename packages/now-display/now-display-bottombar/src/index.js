import React, { Component } from 'react';
import '../assets/index.scss';

export default class BottomBar extends Component {
    static defaultProps = {
        wording: null,
        downWording: null,
        onClick: () => {}
    }

    render() {
        const {
            wording,
            downWording,
            onClick,
            logo
        } = this.props;

        return (
            <section id="bar-container">
                <div className="download">
                    <i
                        className="icon-logo"
                        style={{
                            backgroundImage: `url(${logo})`
                        }}
                    />
                    {
                        wording ? (
                            <span>
                                {wording}
                            </span>
                        ) : null
                    }
                    {
                        downWording ? (
                            <div
                                className="download-btn"
                                onClick={onClick}
                            >
                                <div className="download-word">
                                    {downWording}
                                </div>
                            </div>
                        ) : null
                    }
                </div>
            </section>
        );
    }
}

