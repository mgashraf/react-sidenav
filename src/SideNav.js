
import React, { cloneElement, Component, Children, PropTypes } from 'react';

import Nav from './Nav';

const contextTypes = {
    highlightColor: PropTypes.string,
    highlightBgColor: PropTypes.string,
    hoverBgColor: PropTypes.string
};

const identity = () => {};


export class SideNav extends Component {


    static childContextTypes = contextTypes
    static propTypes = {
        ...contextTypes,
        selected: PropTypes.string,
        defaultSelected: PropTypes.string,
        onItemSelection: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = { selected: props.defaultSelected , defaultSelected: props.defaultSelected };
    }


    getChildContext() {
        const { highlightColor, highlightBgColor, hoverBgColor } = this.props;
        return { highlightColor, highlightBgColor, hoverBgColor };
    }

    onNavClick = (id) => {
        const { onItemSelection = identity } = this.props;

        if ( this.state.defaultSelected ) {
            //lets manage it
            this.setState({ selected: id }, () => {
                onItemSelection(id);
            });
        } else {
            onItemSelection(id);
        }
    }

    render() {

        const { children } = this.props;
        return (
            <div>
                { Children.toArray(children).map( child => {
                    if ( child !== null && child.type === Nav ) {
                        const currentSelected = this.state.defaultSelected ? this.state.selected : this.props.selected;
                        return cloneElement(child, { highlightedId: currentSelected, onClick: this.onNavClick });
                    }
                    return child;
                }) }
            </div>
        );
    }
}

export default SideNav;