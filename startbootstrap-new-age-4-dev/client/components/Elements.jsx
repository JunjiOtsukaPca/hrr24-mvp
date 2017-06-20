var Elements = ({title, desc, weblink}) => (
  <div>
    <div>{title}</div>
    <a href={weblink}>{desc}</a>
  </div>
)
    // {title.map( (title, idx)  =>
    //   console.log(title, desc[idx], weblink[idx])
    // )}
    // {console.log(title, desc, weblink)}

window.Elements = Elements;