import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from '../components/SearchBox';
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
// import { robots } from "./robots";
import "./App.css"


class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('http://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => { this.setState({ robots: users }) });
    }

    onsearchchange = (event) => {
        this.setState({ searchfield: event.target.value })

    }
    render() {
        const { searchfield, robots } = this.state;
        const filteredRobot = robots.filter(robots => {
            return robots.name.toLowerCase().includes(searchfield.toLowerCase())
        })
       
        return !robots.length ?
            <h1>Loading!!!</h1> :
            (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchchange={this.onsearchchange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobot} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            )
    }
     
}

export default App