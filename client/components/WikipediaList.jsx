var WikipediaList = (props) => (
  <div>
    I am here
    <WikipediaListEntry
      searchFor={props.searchFor}
      clickSearchFor={props.clickSearchFor}
    />
  </div>
)

window.WikipediaList = WikipediaList;