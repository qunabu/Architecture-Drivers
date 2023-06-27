import { useContext, useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { DRIVER_NAME } from "./store/api";
import Droppable from "./components/Droppable";
import { Container } from "./components/Container";
import { arrayMove, insertAtIndex, removeAtIndex } from "./utils/array";
import { StoreContext } from "./store/store";
import { ContainerId } from "./store/api";
import { Description } from "./components/Description";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

type DNDHandle = (event: DragEndEvent) => void;

function App() {
  const [showDescription, setShowDescription] = useState(false);
  const { items, setItems, reset, loading } = useContext(StoreContext);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragOver: DNDHandle = ({ over, active }) => {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    if (!active.data.current) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer =
      over.data.current?.sortable.containerId ||
      (overId.toString().indexOf("group") === 0 ? overId : undefined);

    if (!overContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      setItems &&
        setItems((items) => {
          if (!active.data.current) {
            return items;
          }
          const activeIndex = active.data.current.sortable.index;
          const overIndex = over.data.current?.sortable.index || 0;

          return moveBetweenContainers(
            items,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            active.id as DRIVER_NAME
          );
        });
    }
  };

  const handleDragEnd: DNDHandle = ({ active, over }) => {
    if (!over) {
      return;
    }

    if (!active.data.current) {
      return;
    }

    if (active.id !== over.id) {
      const activeContainer: ContainerId =
        active.data.current.sortable.containerId;
      const overContainer: ContainerId =
        over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;

      setItems &&
        setItems((items) => {
          let newItems;
          if (activeContainer === overContainer) {
            newItems = {
              ...items,
              [overContainer]: arrayMove(
                items[overContainer],
                activeIndex,
                overIndex
              ),
            };
          } else {
            newItems = moveBetweenContainers(
              items,
              activeContainer,
              activeIndex,
              overContainer,
              overIndex,
              active.id as DRIVER_NAME
            );
          }

          return newItems;
        });
    }
  };

  const moveBetweenContainers = (
    state: typeof items,
    activeContainer: ContainerId,
    activeIndex: number,
    overContainer: ContainerId,
    overIndex: number,
    item: DRIVER_NAME
  ) => {
    return {
      ...state,
      [activeContainer]: removeAtIndex(state[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(state[overContainer], overIndex, item),
    };
  };

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <DndContext
      collisionDetection={closestCorners}
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <Header />
      <main>
        <Container id="group1">
          <h2>
            Drivers
            {items.group2.length > 0 && (
              <div className="buttons">
                <button
                  onClick={() => setShowDescription((prevState) => !prevState)}
                >
                  {showDescription ? "Hide " : "Show "} description
                </button>
                <button onClick={() => reset && reset()}>Reset</button>
              </div>
            )}
          </h2>
          <Droppable
            id="group1"
            items={items.group1}
            key="group1"
            mode="horizontal"
          />
        </Container>
        <Container id="group2">
          <div className="col1">
            <div>
              <h2>Selected drivers</h2>
              <Droppable id="group2" items={items.group2} key="group2" />
            </div>
          </div>
          <div className="legend">
            <div className="vertical">
              <div className="top"> &lt;-- most important</div>
              <div className="bottom">less important --&gt;</div>
            </div>
          </div>
          <Description showDescription={showDescription} />
        </Container>
      </main>
      <Footer />
    </DndContext>
  );
}

export default App;
