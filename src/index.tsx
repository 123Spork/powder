import * as React from 'react'
import * as ReactDOM from 'react-dom'
import PowderApp from './app'

class App extends React.Component {
  componentDidMount() {
    new PowderApp({fps:60})
  }

  render() {
    return <canvas id="gameCanvas" />
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
