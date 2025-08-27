function getTextNodes() {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    { acceptNode: node => node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT },
    false
  );
  const nodes = [];
  let node;
  while (node = walker.nextNode()) {
    nodes.push(node);
  }
  return nodes;
}

async function translatePage() {
  const nodes = getTextNodes();
  for (const node of nodes) {
    const text = node.nodeValue.trim();
    if (text.length > 0) {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=auto|en`;
      try {
        const res = await fetch(url);
        const json = await res.json();
        if (json.responseData && json.responseData.translatedText) {
          node.nodeValue = json.responseData.translatedText;
        }
      } catch (e) {
        // On error, leave original text
      }
    }
  }
  alert('Page translated to English!');
}

translatePage();
