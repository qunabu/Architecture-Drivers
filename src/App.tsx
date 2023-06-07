import React from 'react'
import { tasks, details } from './assets'
import { Board, DragDropProvider } from './components'
import './styles.css'
import { Description } from './components/Description'

const App: React.FC = () => {
   return (
      <div className="App">
         <h1>How do decide about Architecture Drivers</h1>
         <header>
            <img
               alt="Number of stars from https://github.com/qunabu/Architecture-Drivers"
               src="https://img.shields.io/github/stars/qunabu/Architecture-Drivers?style=social"
            />
         </header>
         <main>
            <DragDropProvider data={tasks} details={details}>
               <Board />
               <div className="legend">
                  <div className="vertical">
                     <div className="top"> &lt;-- most important</div>
                     <div className="bottom">less important --&gt;</div>
                  </div>
               </div>
               <Description />
            </DragDropProvider>
         </main>
         <footer>
            Read list
            <ul>
               <li>
                  <a
                     rel="noreferrer"
                     target="_blank"
                     href="https://www.researchgate.net/publication/303028310_Improving_Software_Applications_Quality_by_Considering_the_Contribution_Relationship_Among_Quality_Attributes"
                  >
                     Improving Software Applications Quality by Considering the Contribution
                     Relationship Among Quality Attributes
                  </a>
               </li>
               <li>
                  <a
                     rel="noreferrer"
                     target="_blank"
                     href="https://appunite.com/blog/what-are-architectural-drivers-in-software-development"
                  >
                     What are architectural drivers in software development?
                  </a>
               </li>
            </ul>
         </footer>
      </div>
   )
}
export default App

