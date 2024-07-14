const ProjectItem = props => {
  const {ItemDetails} = props
  const {name, img} = ItemDetails
  return (
    <li>
      <p>{name}</p>
      <img src={img} alt="name" />
    </li>
  )
}

export default ProjectItem
