function ListItem(props) {
  return (
    <li className="list-none cursor-pointer text-lg px-5 p-1 duration-250 hover:bg-[rgba(0,0,0,0.2)]">
      <a href={props.link}> {props.text} </a>
    </li>
  )
}

export default ListItem;