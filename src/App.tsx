import React from 'react'
import { tasks, details } from './assets'
import { Board, DragDropProvider } from './components'
import './styles.css'
import { Description } from './components/Description'

const App: React.FC = () => {
   return (
      <div className="App">
         <h1>How do decide about Architecture Drivers</h1>
         <main>
            <DragDropProvider data={tasks} details={details}>
               <Board />
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

