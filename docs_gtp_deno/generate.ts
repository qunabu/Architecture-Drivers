import { config } from 'https://deno.land/x/dotenv/mod.ts'

import { OpenAI } from 'https://deno.land/x/openai/mod.ts'

const openAI = new OpenAI(config().KEY)

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

console.log(completion)

//console.log(config())

