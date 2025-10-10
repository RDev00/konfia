function ListItem(props) {
  return (
    <li className="list-none cursor-pointer text-lg text-center py-1 px-10 duration-250 hover:bg-[rgba(0,0,0,0.2)] w-full">
      <a href={props.link}> {props.text} </a>
    </li>
  )
}

export default ListItem;