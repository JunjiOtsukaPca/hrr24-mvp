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
      <a id = "randomPage" href = "https://en.wikipedia.org/wiki/Special:Random" onclick> Click Here For Random Page </a>
        Hello npm
      </div>
    )
  }
}

window.App = App;