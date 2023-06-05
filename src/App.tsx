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
                  <a href="https://www.researchgate.net/publication/303028310_Improving_Software_Applications_Quality_by_Considering_the_Contribution_Relationship_Among_Quality_Attributes">
                     Improving Software Applications Quality by Considering the Contribution
                     Relationship Among Quality Attributes
                  </a>
               </li>
            </ul>
         </footer>
      </div>
   )
}
export default App

