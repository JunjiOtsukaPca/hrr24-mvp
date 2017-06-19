var WikipediaList = (props) => (
  <div>
    I am here
    <WikipediaListEntry
      getList={props.getList}
      searchFor={props.searchFor}
      clickSearchFor={props.clickSearchFor}
    />
  </div>
)

window.WikipediaList = WikipediaList;