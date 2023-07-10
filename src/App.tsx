import { Fragment, useContext, useState } from 'react'
import {
   DndContext,
   KeyboardSensor,
   PointerSensor,
   useSensor,
   useSensors,
   //closestCorners,
   closestCenter,
   //pointerWithin,
   //rectIntersection,
   DragEndEvent,
   DragOverEvent,
   DropAnimation,
   defaultDropAnimation,
   DragOverlay,
   DragStartEvent,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { DRIVER_NAME } from './store/api'
import Droppable from './components/Droppable'
import { Container } from './components/Container'
import { arrayMove, insertAtIndex, removeAtIndex } from './utils/array'
import { StoreContext } from './store/store'
import { ContainerId } from './store/api'
import { Description } from './components/Description'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import SortableItem from './components/SortableItem'
import { IntlMessage } from './components/IntMessage'
import { SettingsDialog } from './components/Settings'

type DNDHandleEnd = (event: DragEndEvent) => void

function App() {
   const [showDescription, setShowDescription] = useState(false)
   const [showSettings, setShowSettings] = useState(false)

   const { items, setItems, reset, loading, max, setMax } = useContext(StoreContext)

   const [activeDriver, setActiveDriver] = useState<null | DRIVER_NAME>(null)

   const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
         coordinateGetter: sortableKeyboardCoordinates,
      }),
   )

   const findBoardSectionContainer = (boardSections: typeof items, id: string) => {
      if (id in boardSections) {
         return id
      }

      const container = Object.keys(boardSections).find((key) =>
         boardSections[key as ContainerId].find((item) => item === id),
      )
      return container
   }

   const handleDragStart = ({ active }: DragStartEvent) => {
      setActiveDriver(active.id as DRIVER_NAME)
   }

   const handleDragOver = ({ active, over }: DragOverEvent) => {
      // Find the containers
      const activeContainer = findBoardSectionContainer(items, active.id as string) as ContainerId
      const overContainer = findBoardSectionContainer(items, over?.id as string) as ContainerId

      if (!activeContainer || !overContainer || activeContainer === overContainer) {
         return
      }

      if (overContainer === 'group2' && items.group2.length === max) {
         return
      }

      setItems &&
         setItems((boardSection) => {
            const activeItems = boardSection[activeContainer]
            const overItems = boardSection[overContainer]

            // Find the indexes for the items
            const activeIndex = activeItems.findIndex((item) => item === active.id)
            const overIndex = overItems.findIndex((item) => item !== over?.id)

            return {
               ...boardSection,
               [activeContainer]: [
                  ...boardSection[activeContainer].filter((item) => item !== active.id),
               ],
               [overContainer]: [
                  ...boardSection[overContainer].slice(0, overIndex),
                  boardSection[activeContainer][activeIndex],
                  ...boardSection[overContainer].slice(
                     overIndex,
                     boardSection[overContainer].length,
                  ),
               ],
            }
         })
   }

   const handleDragEnd: DNDHandleEnd = ({ active, over }) => {
      if (!over) {
         return
      }

      if (!active.data.current) {
         return
      }

      if (active.id !== over.id) {
         const activeContainer: ContainerId = active.data.current.sortable.containerId
         const overContainer: ContainerId = over.data.current?.sortable.containerId || over.id
         const activeIndex = active.data.current.sortable.index
         const overIndex = over.data.current?.sortable.index || 0

         if (
            overContainer === 'group2' &&
            items.group2.length === max &&
            activeContainer !== overContainer
         ) {
            return
         }

         setItems &&
            setItems((items) => {
               let newItems
               if (activeContainer === overContainer) {
                  newItems = {
                     ...items,
                     [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
                  }
               } else {
                  newItems = moveBetweenContainers(
                     items,
                     activeContainer,
                     activeIndex,
                     overContainer,
                     overIndex,
                     active.id as DRIVER_NAME,
                  )
               }

               return newItems
            })
      }
      setActiveDriver(null)
   }

   const moveBetweenContainers = (
      state: typeof items,
      activeContainer: ContainerId,
      activeIndex: number,
      overContainer: ContainerId,
      overIndex: number,
      item: DRIVER_NAME,
   ) => {
      return {
         ...state,
         [activeContainer]: removeAtIndex(state[activeContainer], activeIndex),
         [overContainer]: insertAtIndex(state[overContainer], overIndex, item),
      }
   }

   if (loading) {
      return (
         <h1>
            <IntlMessage item={'loading'} defaultMessage={'loading'} />
            ...
         </h1>
      )
   }

   const dropAnimation: DropAnimation = {
      ...defaultDropAnimation,
   }

   return (
      <DndContext
         collisionDetection={closestCenter}
         sensors={sensors}
         onDragEnd={handleDragEnd}
         onDragOver={handleDragOver}
         onDragStart={handleDragStart}
      >
         <SettingsDialog open={showSettings} onClose={() => setShowSettings(false)} />

         <Header onSettingsClick={() => setShowSettings(true)} />
         <main>
            <Container id="group1">
               <h2>
                  <IntlMessage item={'Drivers'} defaultMessage={'Drivers'} />
                  <div className="buttons">
                     <label>
                        <span>
                           <IntlMessage item={'Maximum Number'} defaultMessage={'Maximum Number'} />
                           :
                        </span>
                        <input
                           type="number"
                           value={max}
                           onChange={(e) => setMax && setMax(e.target.valueAsNumber)}
                           step={1}
                           min={3}
                           max={8}
                        />
                     </label>
                     {items.group2.length > 0 && (
                        <Fragment>
                           <button onClick={() => setShowDescription((prevState) => !prevState)}>
                              <IntlMessage
                                 item={`${showDescription ? 'Hide ' : 'Show '} description`}
                                 defaultMessage={`${
                                    showDescription ? 'Hide ' : 'Show '
                                 } description`}
                              />
                           </button>
                           <button onClick={() => reset && reset()}>
                              {' '}
                              <IntlMessage item={'Reset'} defaultMessage={'Reset'} />
                           </button>
                        </Fragment>
                     )}
                  </div>
               </h2>
               <Droppable id="group1" items={items.group1} key="group1" mode="horizontal" />
            </Container>
            <Container id="group2">
               <div className="col1">
                  <div>
                     <h2>
                        <IntlMessage
                           item={'Selected Drivers'}
                           defaultMessage={'Selected Drivers'}
                        />
                     </h2>
                     <Droppable id="group2" items={items.group2} key="group2" />
                  </div>
               </div>
               <div className="legend">
                  <div className="vertical">
                     <div className="top">
                        {' '}
                        &lt;--{' '}
                        <IntlMessage item={'most important'} defaultMessage={'most important'} />
                     </div>
                     <div className="bottom">
                        <IntlMessage item={'less important'} defaultMessage={'less important'} />{' '}
                        --&gt;
                     </div>
                  </div>
               </div>
               <Description showDescription={showDescription} />
            </Container>
         </main>
         <DragOverlay dropAnimation={dropAnimation}>
            {activeDriver ? <SortableItem id={activeDriver} index={0} group="group1" /> : null}
         </DragOverlay>
         <Footer />
      </DndContext>
   )
}

export default App

