class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingFor: ''
    }
    this.searchFor = (searchValue) => {
      this.setState({searchingFor: searchValue})
    }
    this.clickSearchFor = () => {
      console.log(this.state.searchingFor);
      this.getList = window.getList(this.state.searchingFor);
      $('.textBox').val('');
    }
  }

  render () {
    return (
      <div>
        <a id = "randomPage"
        href = "https://en.wikipedia.org/wiki/Special:Random"> Click Here For Random Page </a>
        <div>
          <WikipediaList
            getList={this.getList}
            searchFor={this.searchFor.bind(this)}
            clickSearchFor={this.clickSearchFor.bind(this)}
          />
        </div>
        <div>
          Hello npm
        </div>

      </div>
    )
  }
}

window.App = App;