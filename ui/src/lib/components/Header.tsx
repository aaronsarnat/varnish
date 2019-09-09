import * as React from 'react';
import { findDOMNode } from 'react-dom';
import styled from 'styled-components';

import { Columns } from './Columns';
import { LayoutHeader } from './Layout';
import { Content } from './Layout';
import { LayoutContext } from '../layout';
import { AI2Banner } from './AI2Banner';

interface Props {
    alwaysVisible?: boolean;
    children: React.ReactNode | React.ReactNodeArray;
}

interface State {
    // isMobileNavVisible: boolean; // todo: support showing a different menu based on breakpoint
    isCollapsed: boolean;
    currentHeaderHeight: number;
}

export class Header extends React.PureComponent<Props, State> {
    private container: React.Component | null = null;
    private banner: React.RefObject<HTMLDivElement>;
    private lastScrollY: number = 0;

    constructor(props: Props) {
        super(props);
        this.state = {
            isCollapsed: false,
            currentHeaderHeight: 0
        };
        this.banner = React.createRef();
    }

    onScroll = () => {
        // This implements logic that:
        //  1. If the user scrolls down the page, at all, the AI2 banner at the top is hidden.
        //  2. If the user scrolls up, at all, the AI2 banner becomes visible again.
        if (this.banner.current !== null) {
            const distance = window.scrollY - this.lastScrollY;
            this.lastScrollY = window.scrollY;
            const isCollapsed = distance > 0;
            this.setState({ isCollapsed })
        }
    };

    componentDidMount() {
        window.addEventListener("scroll", this.onScroll);
        if (this.container !== null) {
            const maybeNode = findDOMNode(this.container);
            if (maybeNode instanceof HTMLElement) {
                const currentHeaderHeight =
                    maybeNode.getBoundingClientRect().height
                this.setState({  currentHeaderHeight });
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll);
    }

    getTopOffset() {
        if (!this.props.alwaysVisible && this.state.isCollapsed && this.banner.current !== null) {
            return (
                -1 *
                (this.banner.current.getBoundingClientRect().height -
                    parseFloat(
                        window.getComputedStyle(this.banner.current).paddingBottom || "0"
                    ))
            );
        }
        return 0;
    }

    render() {
        return (
            <LayoutContext.Consumer>
                {({ setHeaderHeight }) => {
                    const offset = this.getTopOffset();
                    setHeaderHeight(this.state.currentHeaderHeight + offset);
                    return (
                        <Sticky
                            ref={instance => this.container = instance}
                            style={{ top: `${offset}px` }}
                        >
                            <AI2Banner ref={this.banner} />
                            <HeaderContent>
                                {this.props.children}
                            </HeaderContent>
                        </Sticky>
                    );
                }}
            </LayoutContext.Consumer>
        )
    }
}

const HeaderContent = styled(Content)`
    display: flex;
    align-items: center;
    padding-top: 0;
    padding-bottom: 0;
`;

const Sticky = styled(LayoutHeader)`
    && {
        position: sticky;
        top: 0;
        background: white;
        z-index: ${({ theme }) => theme.zIndex.header};
        width: 100%;
        box-shadow: 0px 4px 16px rgba(10, 41, 57, 0.08);
        height: initial; /* Ant sets a height, we need to unset that. */
        padding: 0;
        transition: top 200ms ease-in-out;
    }
`;

export const HeaderColumns = styled(Columns)`
    width: 100%;
    align-items: center;
`;

export const HeaderTitle = styled.h5`
    margin: 0;
    font-size: 1.9rem;
    line-height: 1.65rem;
    @media (max-width: ${({theme}) => theme.breakpoints.xs}) {
        font-size: 1.75rem;
        line-height: 1.5rem;
    }
`;

export const HeaderSubTitle = styled(HeaderTitle)`
    text-transform: none;
`;
