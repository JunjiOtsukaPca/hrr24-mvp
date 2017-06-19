var WikipediaListEntry = (props) => (
  <div>
    <input
      type='text'
      className='textBox'
      onChange={(e) => {
        props.searchFor(e.target.value)
        console.log(e.target.value)
      }}
    />
    <button onClick={props.clickSearchFor}>Find Wiki</button>
  </div>
)

window.WikipediaListEntry = WikipediaListEntry;