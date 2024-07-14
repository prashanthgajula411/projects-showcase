import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import ProjectItem from '../ProjectItem'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]
const ApiCall = {
  loading: 'Loading',
  success: 'Success',
  failure: 'Failure',
}
const AllProjectView = () => {
  const [selectItem, setSelectItem] = useState('ALL')
  const [ProjectList, setProjectList] = useState([])
  const [status, setStatus] = useState(ApiCall.loading)

  const OnChangeProject = event => setSelectItem(event.target.value)

  const Header = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
        alt="website logo"
      />
    </div>
  )

  const DropdownList = () => (
    <select onChange={OnChangeProject} value={selectItem}>
      {categoriesList.map(each => (
        <option key={each.id} value={each.id}>
          {each.displayText}
        </option>
      ))}
    </select>
  )

  const renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  const renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={getProjectData}>
        Retry
      </button>
    </div>
  )

  const renderSuccessView = () => (
    <ul>
      {ProjectList.map(eachItem => (
        <ProjectItem key={eachItem.id} ItemDetails={eachItem} />
      ))}
    </ul>
  )

  const renderResult = () => {
    switch (status) {
      case ApiCall.loading:
        return renderLoadingView()
      case ApiCall.success:
        return renderSuccessView()
      case ApiCall.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  const getProjectData = async () => {
    setStatus(ApiCall.loading)
    //   const url = `https://apis.ccbp.in/ps/projects?$category=${selectItem}`
    const url = `https://apis.ccbp.in/ps/projects?category=${selectItem}`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      const formattedData = data.projects.map(each => ({
        id: each.id,
        name: each.name,
        img: each.image_url,
      }))
      setProjectList(formattedData)
      setStatus(ApiCall.success)
    } else {
      setStatus(ApiCall.failure)
    }
  }

  useEffect(() => {
    getProjectData()
  }, [selectItem])

  return (
    <div>
      {Header()}
      {DropdownList()}
      {renderResult()}
    </div>
  )
}

export default AllProjectView

// import {useState, useEffect} from 'react'
// import Loader from 'react-loader-spinner'
// import ProjectItem from '../ProjectItem'

// const categoriesList = [
//   {id: 'ALL', displayText: 'All'},
//   {id: 'STATIC', displayText: 'Static'},
//   {id: 'RESPONSIVE', displayText: 'Responsive'},
//   {id: 'DYNAMIC', displayText: 'Dynamic'},
//   {id: 'REACT', displayText: 'React'},
// ]

// const ApiCall = {
//   loading: 'Loading',
//   success: 'Success',
//   failure: 'Failure',
// }

// const AllProjectView = () => {
//   const [selectItem, setSelectItem] = useState('ALL')
//   const [projectList, setProjectList] = useState([])
//   const [status, setStatus] = useState(ApiCall.loading)

//   const onChangeProject = event => setSelectItem(event.target.value)

//   const Header = () => (
//     <div>
//       <img
//         src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
//         alt="website logo"
//       />
//     </div>
//   )

//   const DropdownList = () => (
//     <select onChange={onChangeProject} value={selectItem}>
//       {categoriesList.map(each => (
//         <option key={each.id} value={each.id}>
//           {each.displayText}
//         </option>
//       ))}
//     </select>
//   )

//   const renderLoadingView = () => (
//     <div className="products-loader-container">
//       <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
//     </div>
//   )

//   const renderFailureView = () => (
//     <div>
//       <img
//         src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
//         alt="failure view"
//       />
//     </div>
//   )

//   const renderSuccessView = () => (
//     <div>
//       {projectList.map(eachItem => (
//         <ProjectItem key={eachItem.id} ItemDetails={eachItem} />
//       ))}
//     </div>
//   )

//   const renderResult = () => {
//     switch (status) {
//       case ApiCall.loading:
//         return renderLoadingView()
//       case ApiCall.success:
//         return renderSuccessView()
//       case ApiCall.failure:
//         return renderFailureView()
//       default:
//         return null
//     }
//   }

//

//   return (
//     <div>
//       {Header()}
//       {DropdownList()}
//       {renderResult()}
//     </div>
//   )
// }

// export default AllProjectView
