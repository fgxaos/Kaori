import React from "react";
import { Tab, Tabs } from "react-bootstrap";

import Home from "../../modules/Home";
import Search from "../../modules/Search";
import Watching from "../../modules/Watching";
import Seen from "../../modules/Seen";

class TabsSections extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = { key: 1 };
    }

    handleSelect = (key) => {
        this.setState({ key });
        this.props.onSectionChange(this.state.key);
    }
    
    render() {
        return(
            <div>
                <Tabs activeKey={this.state.key} onSelect={this.handleSelect} animation={false} id="menu-choice">
                    <Tab eventKey={1} title="Home">
                        <Home />
                    </Tab>
                    <Tab eventKey={2} title="Search">
                        <Search/>
                    </Tab>
                    <Tab eventKey={3} title="Watching">
                        <Watching/>
                    </Tab>
                    <Tab eventKey={4} title="Seen">
                        <Seen/>
                    </Tab>
                </Tabs>
            </div>
        )
    }

}

export default TabsSections;