// let task = prompt("Task:");
// let link = prompt("link:");
  let linkval = '';
  let taskval = '';
  const button = document.querySelector('#submit');

// Function to convert markdown-like syntax to HTML
function convertMarkdownToHTML(markdown) {
  // Replace headers
  markdown = markdown.replace(/###### (.*)/g, '<h6>$1</h6>');
  markdown = markdown.replace(/##### (.*)/g, '<h5>$1</h5>');
  markdown = markdown.replace(/#### (.*)/g, '<h4>$1</h4>');
  markdown = markdown.replace(/### (.*)/g, '<h3>$1</h3>');
  markdown = markdown.replace(/## (.*)/g, '<h2>$1</h2>');
  markdown = markdown.replace(/# (.*)/g, '<h1>$1</h1>');

  // Replace bold text
  markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Replace italic text
  markdown = markdown.replace(/(?:\*|_)(.*?)\1/g, '<em>$1</em>');
  markdown = markdown.replace(/\*(.*?)\*/g, '<em>$1</em>');
  markdown = markdown.replace(/_(.*?)_/g, '<em>$1</em>');

  // Replace links
  markdown = markdown.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  // Replace blockquotes
  markdown = markdown.replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>');

  // Handle bullet lists
  markdown = markdown.replace(/^\* (.*)$/gm, '<li>$1</li>');
  markdown = markdown.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>'); // Wrap <li> in <ul>

  // Handle numbered lists
  markdown = markdown.replace(/^\d+\. (.*)$/gm, '<li>$1</li>');
  markdown = markdown.replace(/(<li>.*<\/li>)/g, '<ol>$1</ol>'); // Wrap <li> in <ol>

  // Replace inline code
  markdown = markdown.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Replace new lines with <br> tags
  markdown = markdown.replace(/\n/g, '<br>');

  return markdown;
}


async function main() {

    const {available, defaultTemperature, defaultTopK, maxTopK } = await ai.languageModel.capabilities();

    if (available !== "no") {
      const session = await ai.languageModel.create();
    
      // Prompt the model and stream the result:
      const stream = session.promptStreaming('For the link' + linkval + taskval + 'In one very very long continuous answer with bullet points if needed.');
      for await (const chunk of stream) {
        console.log(chunk);
        let previousLength = chunk.length;
        
        let newContent = chunk.slice(previousLength);
        let response = document.querySelector('#response');
        console.log(newContent);
        
        response.innerHTML = convertMarkdownToHTML(chunk) ;

      }
    }
    
}

function getinp(){
  let link = document.querySelector('#link');
  let task = document.querySelector('#task');



  button.onclick = ()=>{
    console.log('clicked');
    linkval = link.value;
    taskval = task.value;
    // console.log(linkval);
    // console.log(taskval);
    main();
  }
}



// Example input






getinp();
