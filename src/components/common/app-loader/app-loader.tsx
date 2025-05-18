// @ts-nocheck
import "./app-loader.css"

const AppLoader = () => {
  return (
    <div className="app-loader-overlay">
      <md-circular-progress indeterminate></md-circular-progress>
    </div>
  )
}

export default AppLoader