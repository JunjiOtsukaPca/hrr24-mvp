class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helloNpm: 'enter the prop variable here'
    }
  }

  render () {
    return (
      <div>
        Hello npm
      </div>
    )
  }
}

window.App = App;