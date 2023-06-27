import React, { useContext } from "react";
import { DRIVER_NAME } from "../store/api";
import { StoreContext } from "../store/store";

const ConfrontDrivers: React.FC<{
  driverName1: DRIVER_NAME;
  driverName2: DRIVER_NAME;
}> = ({ driverName1, driverName2 }) => {
  const { details } = useContext(StoreContext);
  if (driverName1 === driverName2) return <td className="same"> </td>;

  const affects = details[driverName1]?.affects;

  if (affects && affects[driverName2]) {
    return <td>{(affects[driverName2]?.value || 0) > 0 ? "+" : "-"}</td>;
  }

  return <td> </td>;
};

export const Table: React.FC = () => {
  const { details } = useContext(StoreContext);

  return (
    <div className="table">
      <p>
        Here is a table that shows how each driver affect other driver.
        <br />
        <strong>+</strong> means there is a positive connection, one driver
        works well with another they support themselves
        <br />
        <strong>-</strong> means there is a negative connection, one driver
        doesn&apos;t work well with another
      </p>
      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            {Object.keys(details).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(details).map((key) => (
            <tr key={key}>
              <td className="header">{key}</td>
              {Object.keys(details).map((subkey) => (
                <ConfrontDrivers
                  key={subkey}
                  driverName1={key as DRIVER_NAME}
                  driverName2={subkey as DRIVER_NAME}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
