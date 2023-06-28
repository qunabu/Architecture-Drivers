import React, { useContext, useMemo } from "react";

import { DRIVER_NAME } from "../store/api";
import { Table } from "./Table";
import { StoreContext } from "../store/store";
import { Tooltip } from "./Tooltip";

const nl2br = (str: string) =>
  str.split("\n").map((item, idx) => {
    return (
      <span key={idx}>
        {item}
        <br />
      </span>
    );
  });

const Affection: React.FC<{
  task: DRIVER_NAME;
  index: number;
  tasks: DRIVER_NAME[];
  isLast: boolean;
}> = ({ task, index, tasks, isLast = false }) => {
  const { details } = useContext(StoreContext);

  const data = useMemo(() => {
    const positive = Object.entries(details[task]?.affects || {}).filter(
      ([_key, value]) => value.value > 0
    );
    const negative = Object.entries(details[task]?.affects || {}).filter(
      ([_key, value]) => value.value < 0
    );
    return {
      positive,
      negative,
    };
  }, [task, index, tasks]);

  return (
    <div>
      {data.positive.length > 0 && (
        <ul className="affect">
          Affects positively:{" "}
          {data.positive.map((aff) => (
            <Tooltip
              key={aff[0]}
              maxWidth={500}
              top={isLast}
              button={
                <li>
                  <span>+</span> {aff[0]}
                </li>
              }
            >
              {aff[1].description}
            </Tooltip>
          ))}
        </ul>
      )}
      {data.negative.length > 0 && (
        <ul className="affect">
          Affects negatively:{" "}
          {data.negative.map((aff) => (
            <Tooltip
              key={aff[0]}
              maxWidth={500}
              top={isLast}
              button={
                <li>
                  <span>-</span> {aff[0]}
                </li>
              }
            >
              {aff[1].description && nl2br(aff[1].description)}
            </Tooltip>
          ))}
        </ul>
      )}
    </div>
  );
};

export const Description: React.FC<{ showDescription: boolean }> = ({
  showDescription = false,
}) => {
  const { items, details } = useContext(StoreContext);

  return (
    <div className="description">
      {(items.group2.length === 0 || showDescription) && (
        <div>
          <article>
            <h3>How do decide about Architecture Drivers?</h3>
            <p>
              Deciding on the order of architecture drivers involves
              understanding their relative importance and prioritizing them
              based on the specific context and goals of the architecture. Here
              are some steps you can follow to make informed decisions about the
              order of architecture drivers:
            </p>

            <Table />

            <h3>
              Guideline steps about deciding which drivers are important and
              which are the most.
            </h3>

            <p>
              1. Identify and list the architecture drivers: Start by
              identifying and listing all the relevant architecture drivers.
              These drivers are the key factors that influence the design and
              behavior of the architecture. Examples of architecture drivers
              include performance, scalability, security, usability,
              maintainability, cost, time to market, and regulatory compliance.
            </p>
            <p>
              2. Understand the business goals and context: Gain a clear
              understanding of the business goals, objectives, and context in
              which the architecture will be implemented. Consider factors such
              as the organization&apos;s strategy, market demands, customer
              expectations, and any specific constraints or challenges.
            </p>
            <p>
              3. Prioritize based on importance: Evaluate and prioritize the
              architecture drivers based on their relative importance to the
              business goals and context. Determine which drivers have the most
              significant impact on achieving the desired outcomes. For example,
              if time to market is a critical factor, it may be prioritized
              higher than other drivers.
            </p>
            <p>
              4. Consider dependencies and trade-offs: Consider the
              interdependencies and potential trade-offs among the architecture
              drivers. Some drivers may have dependencies on others, while
              optimizing one driver may negatively impact another. For example,
              improving performance might require additional resources and
              impact cost or vice versa.
            </p>
            <p>
              5. Seek stakeholder input: Engage with stakeholders to gather
              their perspectives and input on the prioritization of architecture
              drivers. Stakeholders may include business owners, project
              managers, technical experts, end-users, and other relevant
              parties. Understanding their needs and expectations can help
              inform the prioritization process.
            </p>
            <p>
              6. Revisit and refine the prioritization: Continuously evaluate
              and refine the prioritization based on new information or changing
              circumstances. Architecture decisions are iterative, and
              priorities may shift as the project progresses or new insights
              emerge.
            </p>
            <p>
              7. Document and communicate: Document the prioritization of
              architecture drivers and the rationale behind it. This
              documentation will serve as a reference for the architecture
              design process and help communicate the priorities to the
              development team and other stakeholders.
            </p>
            <p>
              Remember that the order of architecture drivers is
              context-specific and may vary from one project to another.
              It&apos;s essential to consider the unique characteristics, goals,
              and constraints of the specific architecture initiative to make
              informed decisions.
            </p>
            <p>
              <strong>
                This is a tool that hopefully will help you with decision
              </strong>
            </p>
          </article>
        </div>
      )}
      {!showDescription && (
        <ul>
          {items.group2.map((item, index, tasks) => (
            <li key={item}>
              <h2>
                {index + 1}. {item}
              </h2>
              <article>
                <p>{details[item]?.description}</p>
                <Affection
                  isLast={index === tasks.length - 1}
                  task={item}
                  index={index}
                  tasks={tasks}
                />
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
