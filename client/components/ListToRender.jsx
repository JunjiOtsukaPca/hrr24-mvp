var ListToRender = (props) => (
  <div>
      { props.list[1].map(title, idx =>
          <Elements
            title={title}
            desc={props.list[2][idx]}
            weblink={props.list[3][idx]}
          />
      )}
  </div>
)

window.ListToRender = ListToRender;
