import * as React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';

import { convertPixelsToRem } from '../utils/base';
import { AI2Banner } from './AI2Banner';

interface Props {
    children: React.ReactNode | React.ReactNodeArray;
}

interface State {
    // isMobileNavVisible: boolean; // todo: support showing a different menu based on breakpoint
    isCollapsed: boolean;
}

export class Header extends React.PureComponent<Props, State> {
    private banner: React.RefObject<HTMLDivElement>;
    private lastScrollY: number = 0;

    constructor(props: Props) {
        super(props);
        this.state = {
            isCollapsed: false
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
            if ( distance < 0 ) {
                this.setState({ isCollapsed: false });
            } else {
                this.setState({ isCollapsed: true });
            }
        }
    };

    componentDidMount() {
        window.addEventListener("scroll", this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll);
    }

    getTopOffset() {
        if (this.state.isCollapsed && this.banner.current !== null) {
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
            <Sticky style={{ top: `${this.getTopOffset()}px` }}>
                <AI2Banner ref={this.banner}/>
                <Content>
                    {this.props.children}
                </Content>
            </Sticky>
        )
    }
}

const Content = styled.div`
    && {
        display: flex;
        align-items: center;
        margin: auto;
        height: 80px;
        max-width: ${({theme}) => theme.breakpoints.xl};
        padding: ${({theme}) => `0 ${theme.spacing.lg}`};
    }
`;

const Sticky = styled(Layout.Header)`
    && {
        position: sticky;
        top: 0;
        background: white;
        z-index: 1;
        width: 100%;
        box-shadow: 0px 4px 16px rgba(10, 41, 57, 0.08);
        height: auto;
        padding: 0;
        transition: top 200ms ease-in-out;
    }
`;
