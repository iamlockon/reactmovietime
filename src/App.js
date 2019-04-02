import React, { Component } from 'react';
import MainPage from './components/MainPage'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return <div>
        <MainPage />
      </div>
    ;
  }
}

export default App;
