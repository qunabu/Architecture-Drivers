import { useContext } from 'react'

import { StoreContext } from '../store/intl'
import ReactMarkdown from 'react-markdown'

export const DEFAULT_VALUES = {
   Availability: 'Availability',
   Efficiency: 'Efficiency',
   Installability: 'Installability',
   Integrity: 'Integrity',
   Interoperability: 'Interoperability',
   Modifiability: 'Modifiability',
   Performance: 'Performance',
   Portability: 'Portability',
   Reliability: 'Reliability',
   Reusability: 'Reusability',
   Robustness: 'Robustness',
   Safety: 'Safety',
   Scalability: 'Scalability',
   Security: 'Security',
   Usability: 'Usability',
   Verifiability: 'Verifiability',
   loading: 'loading',
   Drivers: 'Drivers',
   'Affects positively': ' Affects positively',
   'Affects negatively': 'Affects negatively',
   'Hide description': 'Hide description',
   'Show description': 'Show description',
   'Selected Drivers': 'Selected Drivers',
   'most important': 'most important',
   'less important': 'less important',
   Reset: 'Reset',
   intlUrl: 'intlUrl',
   storeUrl: 'storeUrl',
   Settings: 'Settings',
   Close: 'Close',
   'Negative bonus from': 'Negative bonus from',
   'Positive bonus from': 'Positive bonus from',
   'Read list': 'Read list',
   title: 'How do decide about Architecture Drivers?',
   SettingsDescription: [
      '## Settings',
      '',
      'With current settings you can change values of drivers and translate whole application.',
      '',
      "All settings are fetched from remote server. Please clone the following js bins, put your values and setup link in the following inputs{' '}",
      '',
      '*   [Architecture Drivers (EN)](https://www.npoint.io/docs/7f9e677a982eed622d84)',
      '*   [Architecture Drivers i18n lib (EN) ](https://www.npoint.io/docs/f6f69eee26eb7445359f)',
   ],
   Description: [
      'Paste in some lines of text.### How do decide about Architecture Drivers?',
      '',
      'Deciding on the order of architecture drivers involves understanding their relative importance and prioritizing them based on the specific context and goals of the architecture. Here are some steps you can follow to make informed decisions about the order of architecture drivers:',
      '',
      '### Guideline steps about deciding which drivers are important and which are the most.',
      '',
      '1\\. Identify and list the architecture drivers: Start by identifying and listing all the relevant architecture drivers. These drivers are the key factors that influence the design and behavior of the architecture. Examples of architecture drivers include performance, scalability, security, usability, maintainability, cost, time to market, and regulatory compliance.',
      '',
      "2\\. Understand the business goals and context: Gain a clear understanding of the business goals, objectives, and context in which the architecture will be implemented. Consider factors such as the organization's strategy, market demands, customer expectations, and any specific constraints or challenges.",
      '',
      '3\\. Prioritize based on importance: Evaluate and prioritize the architecture drivers based on their relative importance to the business goals and context. Determine which drivers have the most significant impact on achieving the desired outcomes. For example, if time to market is a critical factor, it may be prioritized higher than other drivers.',
      '',
      '4\\. Consider dependencies and trade-offs: Consider the interdependencies and potential trade-offs among the architecture drivers. Some drivers may have dependencies on others, while optimizing one driver may negatively impact another. For example, improving performance might require additional resources and impact cost or vice versa.',
      '',
      '5\\. Seek stakeholder input: Engage with stakeholders to gather their perspectives and input on the prioritization of architecture drivers. Stakeholders may include business owners, project managers, technical experts, end-users, and other relevant parties. Understanding their needs and expectations can help inform the prioritization process.',
      '',
      '6\\. Revisit and refine the prioritization: Continuously evaluate and refine the prioritization based on new information or changing circumstances. Architecture decisions are iterative, and priorities may shift as the project progresses or new insights emerge.',
      '',
      '7\\. Document and communicate: Document the prioritization of architecture drivers and the rationale behind it. This documentation will serve as a reference for the architecture design process and help communicate the priorities to the development team and other stakeholders.',
      '',
      "Remember that the order of architecture drivers is context-specific and may vary from one project to another. It's essential to consider the unique characteristics, goals, and constraints of the specific architecture initiative to make informed decisions.",
      '',
      '**This is a tool that hopefully will help you with decision**',
   ],
}
export const IntlMessage: React.FC<{ item: string; defaultMessage: string | string[] }> = ({
   item,
   defaultMessage,
}) => {
   const { getMessage } = useContext(StoreContext)
   const value = getMessage(item) || defaultMessage

   return <ReactMarkdown>{Array.isArray(value) ? value.join('\n') : value}</ReactMarkdown>
}

