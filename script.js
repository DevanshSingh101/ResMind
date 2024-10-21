// let task = prompt("Task:");
// let link = prompt("link:");




async function main() {

    const {available, defaultTemperature, defaultTopK, maxTopK } = await ai.languageModel.capabilities();

    if (available !== "no") {
      const session = await ai.languageModel.create();
    
      // Prompt the model and stream the result:
      const stream = session.promptStreaming('find reasons to attend and to not attend duke in 100words from the link https://www.youtube.com/watch?v=-wITlvHY1fQ');
      for await (const chunk of stream) {
        console.log(chunk);
        let previousLength = chunk.length;
        
        let newContent = chunk.slice(previousLength);
        let response = document.querySelector('#response');
        console.log(newContent);
        
        response.innerHTML += newContent;

      }
    }
    
}

main();