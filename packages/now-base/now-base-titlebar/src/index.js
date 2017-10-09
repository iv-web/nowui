import React from 'react';
import classnames from 'classnames';
import '../assets/index.scss';

class Titlebar extends React.Component {
    static defaultProps = {
        showBack: true,
        showShare: true,
        onBack: () => {},
        onShare: () => {}
    }

    render() {
        const { props } = this;

        const titlebarClassName = classnames(props.className, {
            titlebar: true
        });

        return (
            <div className={titlebarClassName}>
                {
                    props.showBack ? (
                        <div className="back" onClick={props.onBack} />
                    ) : null
                }
                {
                    props.showShare ? (
                        <div className="share" onClick={props.onShare} />
                    ) : null
                }
            </div>
        );
    }
}

export default Titlebar;
