function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


async function blockNav(idx, newBlock, onlySelect) {
  const ed = logseq.Editor, app = logseq.App;
  const before = idx >= 0;
  let page = await ed.getCurrentPage();

  if (page === null) {
    const today = await app.getStateFromStore('today');
    page = await ed.getPage(today);
    if (page === null) return;
  }

  let blocks = await ed.getPageBlocksTree(page.name);
  if (blocks === null || blocks.length < 1) return;

  const bidx = idx < 0 ? Math.max(0, blocks.length - Math.abs(idx)) : Math.min(idx, blocks.length - 1);
  let block = blocks[bidx];

  newBlock = newBlock && !(block.children.length < 1 && block.content === '');
  if (newBlock) {
    block = await ed.insertBlock(block.uuid, '', {
      before, isPageBlock: false, sibling: true
    });
  }

  await ed.editBlock(block.uuid);

  if (onlySelect) await delay(50).then(() => ed.exitEditingMode(true));
}

function main () {
  logseq.App.registerCommandPalette({
    key: 'blocknav-prepend',
    keybinding: { binding: 'b p', mode: 'non-editing' },
    label: 'Blocknav: Prepend and edit',
    palette: true
  }, () => blockNav(0, true));

  logseq.App.registerCommandPalette({
    key: 'blocknav-append',
    keybinding: { binding: 'b b', mode: 'non-editing' },
    label: 'Blocknav: Append and edit',
    palette: true
  }, () => blockNav(-1, true));

  logseq.App.registerCommandPalette({
    key: 'blocknav-1',
    keybinding: { binding: 'b 1', mode: 'non-editing' },
    label: 'Blocknav: Edit first block',
    palette: true
  }, () => blockNav(0));

  for (let bnum = 1; bnum < 10; bnum++) {
    const bs = (bnum + 1).toString();
    logseq.App.registerCommandPalette({
      key: 'blocknav-'.concat(bs),
      keybinding: { binding: 'b '.concat(bnum < 9 ? bs : '0'), mode: 'non-editing' },
      label: 'Blocknav: Edit block '.concat(bs),
      palette: true
    }, () => blockNav(bnum));
  }

  logseq.App.registerCommandPalette({
    key: 'blocknav-last',
    keybinding: { binding: 'b e', mode: 'non-editing' },
    label: 'Blocknav: Edit last block',
    palette: true
  }, () => blockNav(-1));
}

logseq.ready(main).catch(console.error);
