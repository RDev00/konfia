import ListItem from './subcomponents/listItem';

function NavSection(props) {
  return (
    <section ref={props.ref}>
      <ListItem />
    </section>
  )
}