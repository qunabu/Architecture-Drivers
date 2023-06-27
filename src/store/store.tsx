import React, {
  Context,
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

import { DRIVERS, DRIVER_NAME, TaskTypeDetails } from "./api";
import { useHashParams } from "../hooks/setHashParams";

type StoreContextType = {
  loading: boolean;
  items: State;
  setItems?: React.Dispatch<React.SetStateAction<State>>;
  reset?: () => void;
  details: TaskTypeDetails;
};

type State = {
  group1: DRIVER_NAME[];
  group2: DRIVER_NAME[];
};

// FIX THIS
// @ts-ignore
export const StoreContext: Context<StoreContextType> = createContext({
  loading: false,
  items: {
    group1: [],
    group2: [],
  },
  details: {} as TaskTypeDetails,
});

export const StoreContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [details, setDetails] = useState<TaskTypeDetails>({});

  const [items, setItems] = useHashParams<State>("groups", {
    group1: DRIVERS,
    group2: [],
  });

  const onDriversLoaded = (drivers: TaskTypeDetails) => {
    setDetails(drivers);
    if (items.group1.length === 0) {
      setItems({
        group1: Object.keys(drivers) as DRIVER_NAME[],
        group2: [],
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch("drivers.json")
      .then((data) => data.json())
      .then((drivers) => onDriversLoaded(drivers))
      .finally(() => setLoading(false));
  }, []);

  const reset = () => {
    setItems({
      group1: DRIVERS,
      group2: [],
    });
  };
  const value = {
    loading,
    items,
    setItems,
    reset,
    details,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
