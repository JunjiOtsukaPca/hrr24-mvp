var WikipediaList = (props) => (
  <div>
    <WikipediaListEntry
      searchFor={props.searchFor}
      clickSearchFor={props.clickSearchFor}
    />
  </div>
)

window.WikipediaList = WikipediaList;