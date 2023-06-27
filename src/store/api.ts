// TODO
// This should be loaded dynamically
export type DRIVER_NAME =
  | "Availability"
  | "Efficiency"
  | "Installability"
  | "Integrity"
  | "Interoperability"
  | "Modifiability"
  | "Performance"
  | "Portability"
  | "Reliability"
  | "Reusability"
  | "Robustness"
  | "Safety"
  | "Scalability"
  | "Security"
  | "Usability"
  | "Verifiability";

export const DRIVERS: DRIVER_NAME[] = [
  "Availability",
  "Efficiency",
  "Installability",
  "Integrity",
  "Interoperability",
  "Modifiability",
  "Performance",
  "Portability",
  "Reliability",
  "Reusability",
  "Robustness",
  "Safety",
  "Scalability",
  "Security",
  "Usability",
  "Verifiability",
];

export type TaskType = DRIVER_NAME;

export type TaskTypeDetails = Partial<
  Record<
    DRIVER_NAME,
    {
      description?: string;
      affects?: Partial<
        Record<DRIVER_NAME, { value: 1 | -1; description?: string }>
      >;
    }
  >
>;

export const InitialTasksDetails: TaskTypeDetails = {
  Availability: {
    description:
      "Availability is an essential architectural driver that ensures a system or service remains accessible and operational for users when needed. Availability architecture encompasses the design and implementation of strategies, technologies, and practices to minimize downtime, maintain system uptime, and provide uninterrupted access to resources. It involves identifying and mitigating potential points of failure, implementing redundancy and fault tolerance mechanisms, monitoring system health and performance, and establishing robust disaster recovery and business continuity plans. By prioritizing availability, organizations can enhance user experience, increase reliability, and minimize the impact of disruptions, thus meeting the expectations and demands of their users.",
    affects: {
      Reliability: { value: 1 },
      Robustness: { value: 1 },
    },
  },
  Efficiency: {
    description:
      "Efficiency is a crucial architecture driver that focuses on optimizing system performance and resource utilization to achieve maximum efficiency and minimize waste. Efficiency architecture involves designing and implementing solutions that are capable of delivering high performance while utilizing minimal resources such as processing power, memory, storage, and network bandwidth. It encompasses techniques like load balancing, caching, data compression, and parallel processing to streamline operations, reduce latency, and improve scalability. By prioritizing efficiency, organizations can enhance system responsiveness, reduce operational costs, and maximize the utilization of available resources, resulting in improved productivity and better overall performance.",
    affects: {
      Availability: { value: 1 },
      Scalability: { value: 1 },
      Performance: { value: 1 },
      Interoperability: { value: -1 },
      Modifiability: { value: -1 },
      Portability: { value: -1 },
      Robustness: { value: -1 },
      Usability: { value: -1 },
    },
  },
  Installability: {
    description:
      "Installability is an important architecture driver that focuses on ensuring smooth and hassle-free installation and deployment of software systems or applications. Installability architecture encompasses designing and implementing solutions that are easy to install, configure, and update. It involves creating intuitive installation processes, providing clear instructions, minimizing dependencies, and automating deployment tasks. The goal is to enable users to quickly and efficiently install the software on their target environments without encountering compatibility issues or complex setup procedures. By prioritizing installability, organizations can enhance user experience, reduce installation errors, and facilitate widespread adoption of their software, ultimately saving time and effort for both users and administrators.",
    affects: {
      Availability: { value: 1 },
      Reliability: { value: 1 },
      Security: { value: 1 },
    },
  },
  Integrity: {
    description:
      "Integrity is a critical architecture driver that focuses on ensuring the accuracy, consistency, and reliability of data and information within a system. Integrity architecture involves designing and implementing mechanisms to prevent unauthorized access, unauthorized modification, or corruption of data. It includes strategies such as data validation, access controls, encryption, and audit trails to protect the integrity of data throughout its lifecycle. The goal is to maintain the trustworthiness and reliability of the system, ensuring that the information it processes remains intact and consistent. By prioritizing integrity, organizations can mitigate the risks of data breaches, tampering, and fraud, safeguarding the integrity of their systems and instilling confidence in users and stakeholders.",
    affects: {
      Installability: { value: -1 },
      Interoperability: { value: -1 },
      Performance: { value: -1 },
      Reusability: { value: -1 },
      Safety: { value: 1 },
      Security: { value: 1 },
      Usability: { value: -1 },
      Verifiability: { value: -1 },
    },
  },
  Interoperability: {
    description:
      "Interoperability is a fundamental architecture driver that focuses on enabling seamless communication, interaction, and collaboration between different systems, applications, or components. Interoperability architecture involves designing and implementing standards, protocols, and interfaces that facilitate the exchange of data, services, and functionality across heterogeneous environments. It includes strategies such as APIs (Application Programming Interfaces), data formats, and compatibility layers to ensure that disparate systems can understand and work together effectively. The goal is to promote system integration, facilitate information sharing, and enable the interoperability of various technologies. By prioritizing interoperability, organizations can enhance connectivity, promote ecosystem integration, and enable the efficient exchange of data and services, thereby fostering collaboration and improving the overall functionality and value of their systems.",
    affects: {
      Availability: { value: 1 },
      Installability: { value: -1 },
      Integrity: { value: -1 },
      Performance: { value: -1 },
      Safety: { value: -1 },
      Security: { value: -1 },
      Portability: { value: 1 },
      Usability: { value: 1 },
      Robustness: { value: 1 },
    },
  },
  Modifiability: {
    description:
      "Modifiability is a crucial architecture driver that focuses on the ease and flexibility of making changes to a system throughout its lifecycle. Modifiability architecture involves designing and implementing solutions that can be easily modified, extended, or adapted to accommodate evolving business requirements, technological advancements, and user needs. It includes employing modular design principles, encapsulation, and loose coupling to minimize the impact of changes and facilitate independent modifications. The goal is to enable efficient maintenance, upgrades, and enhancements while minimizing the risk of introducing errors or disruptions. By prioritizing modifiability, organizations can respond quickly to changing demands, reduce development cycles, and optimize the agility and adaptability of their systems, ensuring they remain responsive and sustainable in the face of evolving challenges.",
    affects: {
      Availability: { value: 1 },
      Installability: { value: -1 },
      Performance: { value: -1 },
      Reliability: { value: 1 },
      Reusability: { value: 1 },
      Scalability: { value: 1 },
      Verifiability: { value: 1 },
    },
  },
  Performance: {
    description:
      "Performance is a critical architecture driver that focuses on ensuring the responsiveness and efficiency of a system in terms of its speed, throughput, and resource utilization. Performance architecture involves designing and implementing solutions that can deliver optimal performance under anticipated workloads and usage scenarios. It encompasses techniques such as performance modeling, load balancing, caching, and optimization algorithms to minimize response times, maximize throughput, and utilize resources effectively. The goal is to provide a high-performing system that meets user expectations, delivers a smooth user experience, and can scale to handle increasing demands. By prioritizing performance, organizations can enhance user satisfaction, improve productivity, and achieve the desired level of system efficiency, ultimately enabling them to gain a competitive edge in the market.",
    affects: {
      Efficiency: { value: 1 },
      Interoperability: { value: -1 },
      Modifiability: { value: -1 },
      Portability: { value: -1 },
      Robustness: { value: -1 },
      Scalability: { value: -1 },
      Usability: { value: -1 },
    },
  },
  Portability: {
    description:
      "Portability is an essential architecture driver that focuses on the ability of a system or software to be easily moved or deployed across different environments, platforms, or technologies. Portability architecture involves designing and implementing solutions that can be seamlessly installed, configured, and run on various target systems without significant modifications or dependencies. It includes strategies such as platform-agnostic design, adherence to industry standards, and compatibility with different operating systems or hardware configurations. The goal is to enable the system to be portable, adaptable, and easily transferable, allowing organizations to deploy their solutions across diverse environments and leverage different technologies while minimizing the effort and cost associated with platform-specific development or migration. By prioritizing portability, organizations can enhance flexibility, reduce vendor lock-in, and facilitate the deployment and adoption of their systems in a wide range of scenarios.",
    affects: {
      Interoperability: { value: 1 },
      Reusability: { value: 1 },
      Verifiability: { value: 1 },
      Efficiency: { value: -1 },
      Modifiability: { value: -1 },
      Performance: { value: -1 },
      Security: { value: -1 },
      Usability: { value: -1 },
    },
  },
  Reliability: {
    affects: {
      Availability: { value: 1 },
      Efficiency: { value: -1 },
      Integrity: { value: 1 },
      Modifiability: { value: 1 },
      Performance: { value: -1 },
      Robustness: { value: 1 },
      Safety: { value: 1 },
      Security: { value: 1 },
      Usability: { value: 1 },
      Verifiability: { value: 1 },
    },
    description:
      "Reliability is a crucial architecture driver that focuses on ensuring the dependability and consistent performance of a system over time. Reliability architecture involves designing and implementing solutions that are resilient, robust, and capable of delivering uninterrupted service. It encompasses strategies such as fault tolerance, error handling, redundancy, and graceful degradation to minimize the impact of failures or disruptions. The goal is to create a reliable system that can withstand various types of failures, such as hardware malfunctions, network outages, or software errors, while maintaining its functionality and meeting service level agreements. By prioritizing reliability, organizations can enhance user trust, minimize downtime, and mitigate the risks associated with system failures, thereby improving customer satisfaction and the overall success of their solutions.",
  },
  Reusability: {
    affects: {
      Efficiency: { value: -1 },
      Integrity: { value: -1 },
      Interoperability: { value: 1 },
      Modifiability: { value: 1 },
      Performance: { value: -1 },
      Portability: { value: 1 },
      Security: { value: -1 },
      Verifiability: { value: 1 },
    },
    description:
      "Reusability is a significant architecture driver that focuses on designing and implementing software components or systems in a way that enables their efficient reuse across multiple projects or contexts. Reusability architecture involves creating modular, loosely-coupled, and self-contained components that can be easily integrated and adapted for different purposes. It includes strategies such as encapsulation, standardized interfaces, and well-defined APIs to promote component reuse and minimize duplication of effort. The goal is to maximize productivity, reduce development time, and improve overall system quality by leveraging existing, tested, and proven components. By prioritizing reusability, organizations can streamline development processes, foster code sharing and collaboration, and achieve consistency and maintainability across their software ecosystem, ultimately maximizing the return on investment and promoting long-term sustainability.",
  },
  Robustness: {
    affects: {
      Availability: { value: 1 },
      Efficiency: { value: -1 },
      Installability: { value: 1 },
      Integrity: { value: 1 },
      Interoperability: { value: 1 },
      Performance: { value: -1 },
      Reliability: { value: 1 },
      Safety: { value: 1 },
      Scalability: { value: 1 },
      Security: { value: 1 },
      Usability: { value: 1 },
    },
    description:
      "Robustness is a crucial architecture driver that focuses on designing and implementing systems that can handle unexpected or erroneous conditions without failing or compromising their overall functionality. Robustness architecture involves creating solutions that are resilient, fault-tolerant, and capable of gracefully handling exceptional situations or inputs. It includes strategies such as input validation, error handling, exception management, and defensive programming to anticipate and recover from failures or errors. The goal is to ensure that the system can continue operating reliably even in the presence of unpredictable events, erroneous data, or adverse conditions. By prioritizing robustness, organizations can enhance system stability, improve user experience, and minimize the impact of failures, ultimately delivering a dependable and trustworthy solution to their users.",
  },
  Safety: {
    affects: {
      Efficiency: { value: -1 },
      Integrity: { value: 1 },
      Interoperability: { value: 1 },
      Performance: { value: -1 },
      Robustness: { value: 1 },
      Security: { value: 1 },
      Usability: { value: -1 },
      Verifiability: { value: -1 },
    },
    description:
      "Safety is a critical architecture driver that focuses on designing and implementing systems that prioritize the prevention of harm or danger to users, the environment, and other entities. Safety architecture involves considering potential hazards, risks, and failures in the system and incorporating mechanisms to mitigate them. It includes strategies such as error detection, fault tolerance, redundancy, safety protocols, and fail-safe mechanisms to ensure the system operates within safe limits and can respond appropriately to unsafe conditions. The goal is to minimize the likelihood and severity of accidents, injuries, or damage caused by the system's operation or malfunctions. By prioritizing safety, organizations can protect human lives, preserve assets, comply with regulatory requirements, and build trust in their systems, ultimately ensuring the well-being and security of all stakeholders involved.",
  },
  Scalability: {
    affects: {
      Availability: { value: 1 },
      Efficiency: { value: 1 },
      Integrity: { value: 1 },
      Performance: { value: 1 },
      Portability: { value: 1 },
      Reliability: { value: 1 },
      Robustness: { value: 1 },
    },
    description:
      "Scalability is a fundamental architecture driver that focuses on designing and implementing systems that can efficiently handle increasing workloads and accommodate growth in user demand or data volume. Scalability architecture involves creating solutions that can easily scale in terms of performance, capacity, and resources as the system's requirements evolve. It includes strategies such as horizontal or vertical scaling, distributed computing, load balancing, and elastic provisioning to ensure that the system can effectively handle growing demands without compromising performance or responsiveness. The goal is to enable the system to seamlessly accommodate increased usage, user base, or data size, ensuring that it remains performant and responsive even under high load conditions. By prioritizing scalability, organizations can future-proof their systems, support business growth, and maintain a satisfactory user experience, ultimately providing a robust and adaptable solution in the face of changing demands.",
  },
  Security: {
    affects: {
      Availability: { value: 1 },
      Integrity: { value: 1 },
      Interoperability: { value: 1 },
      Performance: { value: -1 },
      Portability: { value: -1 },
      Reliability: { value: 1 },
      Robustness: { value: 1 },
      Safety: { value: 1 },
      Usability: { value: -1 },
      Verifiability: { value: -1 },
    },
    description:
      "Security is a critical architecture driver that focuses on designing and implementing systems that protect data, resources, and functionalities from unauthorized access, breaches, and malicious activities. Security architecture involves establishing robust security measures, mechanisms, and controls to ensure the confidentiality, integrity, and availability of the system. It includes strategies such as authentication, encryption, access controls, intrusion detection, and secure communication protocols to mitigate risks and vulnerabilities. The goal is to safeguard sensitive information, prevent unauthorized actions, and maintain the overall security posture of the system. By prioritizing security, organizations can protect their assets, comply with regulations, build trust with users, and minimize the potential for financial loss, reputation damage, or legal consequences resulting from security breaches or data compromises.",
  },
  Usability: {
    affects: {
      Efficiency: { value: -1 },
      Installability: { value: 1 },
      Performance: { value: -1 },
      Portability: { value: -1 },
      Reliability: { value: 1 },
      Robustness: { value: 1 },
      Safety: { value: 1 },
      Verifiability: { value: -1 },
    },
    description:
      "Usability is a crucial architecture driver that focuses on designing and implementing systems that are intuitive, efficient, and enjoyable to use by the intended users. Usability architecture involves considering the user's perspective and incorporating user-centered design principles to ensure that the system meets their needs, goals, and expectations. It includes strategies such as user research, usability testing, information architecture, and user interface design to create an interface that is easy to navigate, understand, and interact with. The goal is to provide a positive user experience, enhance user productivity, and minimize user errors or frustrations. By prioritizing usability, organizations can improve user adoption, satisfaction, and overall system acceptance, ultimately leading to increased user engagement, productivity, and loyalty.",
  },
  Verifiability: {
    affects: {
      Availability: { value: 1 },
      Installability: { value: 1 },
      Integrity: { value: 1 },
      Modifiability: { value: 1 },
      Reliability: { value: 1 },
      Reusability: { value: 1 },
      Robustness: { value: 1 },
      Safety: { value: 1 },
      Usability: { value: 1 },
    },
    description:
      "Verifiability is an important architecture driver that focuses on ensuring the system's ability to provide evidence or proof of correctness, compliance, or desired behavior. Verifiability architecture involves designing and implementing solutions that are verifiable through various means, such as formal methods, testing, auditing, or monitoring. It includes strategies such as code review, unit testing, integration testing, and validation against specifications or requirements to ensure that the system performs as intended and meets the desired quality standards. The goal is to establish confidence in the system's correctness, reliability, and adherence to standards or regulations. By prioritizing verifiability, organizations can mitigate risks, improve system quality, and enhance trust in the system, ultimately enabling stakeholders to have confidence in its operation and outcomes.",
  },
};

export const InitialTasks: TaskType[] = Object.keys(
  InitialTasksDetails
) as TaskType[];

export type ColumnType = {
  id: string;
  tasks: TaskType[];
};

export type ColumnTypeID = number[][];

export type TaskBoardType = ColumnType[];

export type TaskBoardTypeTulpe = [string, string[]];

export const tasks: TaskBoardType = [
  {
    id: "unassigned",
    tasks: InitialTasks,
  },
  {
    id: "assigned",
    tasks: [],
  },
];

export const details = InitialTasksDetails;

export type ContainerId = "group1" | "group2";
