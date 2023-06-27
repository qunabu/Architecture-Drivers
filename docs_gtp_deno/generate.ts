import { config } from 'https://deno.land/x/dotenv/mod.ts'
import { OpenAI } from 'https://deno.land/x/openai/mod.ts'

import InitialTasksDetails from './hello.json' assert { type: 'json' }

const openAI = new OpenAI(config().KEY)

const getAffectionDescription = async (query: string) => {
   const completion = await openAI.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
         {
            role: 'user',
            content: query,
         },
      ],
   })

   return completion.choices[0].message.content
}

// imperative way not to overload the API

for (let key of Object.keys(InitialTasksDetails)) {
   //const affects = InitialTasksDetails[key].affects
   for (let affect of Object.entries(InitialTasksDetails[key].affects)) {
      const query = `Write 3 sentences why in terms of selecting Architectural Drivers ${
         affect[0]
      } affects ${affect[1].value === 1 ? 'positively' : 'negatively'} ${key}.`

      InitialTasksDetails[key].affects[affect[0]].query = query

      if (!InitialTasksDetails[key].affects[affect[0]].description) {
         console.log('generating', key, query)

         InitialTasksDetails[key].affects[affect[0]].description = await getAffectionDescription(
            query,
         )

         console.log('description', InitialTasksDetails[key].affects[affect[0]].description)

         await Deno.writeTextFile('./hello.json', JSON.stringify(InitialTasksDetails))
      } else {
         console.log('skiping', key, query)
      }

      // console.log(key, query)
   }
}
/*

Object.keys(InitialTasksDetails).forEach((key) => {
   const affects = InitialTasksDetails[key].affects
   Object.entries(affects).forEach(async (affect) => {
      const query = `Write 3 sentences why in terms of selecting Architectural Drivers ${
         affect[0]
      } affects ${affect[1].value === 1 ? 'positively' : 'negatively'} ${key}.`

      const completion = await getAffectionDescription(query)

      InitialTasksDetails[key].affects[affect[0]].description = completion

      await Deno.writeTextFile('./hello.json', JSON.stringify(InitialTasksDetails))
   })
})
*/

//console.log(InitialTasksDetails)

/*



const completion = await openAI.createChatCompletion({
   model: 'gpt-3.5-turbo',
   messages: [
      {
         role: 'user',
         content:
            'Write 3 sentences why in terms of selecting Architectural Drivers Modifiability affects negatively Installability.',
      },
   ],
})

await Deno.writeTextFile('./hello.json', JSON.stringify(completion))

*/

