// background.js

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    const mainContent = request.content || request.highlightedText;

    console.log('Sending the following: ', mainContent);
  
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer CHANGEME',
            },
            body: JSON.stringify({
              "model": "gpt-3.5-turbo",
              "messages": [{"role": "user", "content": mainContent}]
          }),
          })
      const data = await response.json();

      console.log('Data from OpenAI: ', data);

      const messageBack = data.choices[0].message.content;
      //sendResponse({ message: message });
      console.log('Sending: ', messageBack);
      if(request.content) {
     chrome.tabs.sendMessage(sender.tab.id, { message: messageBack, method: 'summary-response'});
      } else if(request.highlightedText) {
        chrome.tabs.sendMessage(sender.tab.id, { message: messageBack, method: 'highlighed-definition'});
      }

    } catch (error) {
      console.error('Error:', error);
      //sendResponse({ message: 'An error occurred while processing your request.' });
    }
  
    // Keep the sendResponse function alive for asynchronous use
    return true;
  });
  
  