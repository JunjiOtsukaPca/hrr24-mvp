class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingFor: [
        ['check'],
        ['The result will pop up here'],
        ['The hyperlink will be here'],
        ['please']
      ]
    }
    this.searchFor = (searchValue) => {
      this.setState({searchingFor: searchValue})
    }
    this.clickSearchFor = () => {
      this.getList = window.getList(this.state.searchingFor, (searchResult) => {
        this.setState({
          searchingFor: searchResult
        })
      });
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
            searchFor={this.searchFor.bind(this)}
            clickSearchFor={this.clickSearchFor.bind(this)}
          />
          <ListToRender list={this.state.searchingFor}/>
        </div>
        <div>
          Hello npm
        </div>

      </div>
    )
  }
}

        //   {
        //     (() => {if (this.state.searchingFor) {
        //     console.log(true);
        //   }})
        // }
window.App = App;