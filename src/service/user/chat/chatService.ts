
// import readline from 'node:readline/promises';
// import process from 'process';
import ollama from 'ollama';
// import { INewUser } from '@/src/interfaces/interface';
import { getFactsByUserId } from '@/src/repository/facts/getUserById';

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

const TAG = "SERVICE(POST): chat ";

export async function chatService(id: string, message: string) {
  try {
    // tratar a mensagem para prevenir injeção de código ou outros ataques

    // buscar fatos relevantes sobre o usuário no banco de dados
    // const facts = await getFactsByUserId(id) || ''; // substituir por consulta real ao banco de dados usando o id do usuário'
    const facts = ''; // substituir por consulta real ao banco de dados usando o id do usuário'

    const response = await ollama.chat({
      model: 'llama3',
      messages: [
        {
          role: 'user',
          content: `
          Extraia fatos duradouros e relevantes sobre o usuário e responda a mensagem do usuário.
            fatos sobre o usuário: ${facts}

            Mensagem: ${message}

            Retorne JSON nesse formato 
            {
              "user_info": {
                "goal": "",
                "facts": []
              },
              "resposta": ""
            }.
          `,
        },
      ],
    });
    // console.log('Resposta bruta:', response);
    const jsonMatch = response.message.content.match(/\{[\s\S]*\}/);
    console.log('Resposta jsonMatch:', jsonMatch ? jsonMatch[0] : 'Nenhum JSON encontrado');
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      // atualizar/criar os fatos do usuário no banco de dados usando parsed.user_info
      // armazenar a message e a resposta da IA para ter o histórico de conversas do usuário

      console.log('\nAssistente:', parsed);
      return parsed.resposta;
    }
    console.log('\n');
  } catch (e : any) {
      console.log(TAG, e);
      if (!e.status) {
          e.status = 500;
      }
      throw e;
  }
}
