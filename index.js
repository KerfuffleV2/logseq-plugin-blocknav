const DEFAULT_BINDS = [
  { idx: 0, new: true, id: 'prepend', bind: 'b p', desc: 'Prepend and edit', },
  { idx: -1, new: true, id: 'append', bind: 'b b', desc: 'Append and edit', },
  { idx: -1, id: 'last', bind: 'b l', desc: 'Edit last block', },
].concat(Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  idx => {
    const bnum = idx + 1;
    return { idx, id: bnum.toString(), bind: `b ${bnum < 10 ? bnum : 0}`, desc: `Edit block ${bnum}`};
  }
));


const SETTINGS_SCHEMA = [
  {
    key: 'default-shortcuts',
    type: 'boolean',
    title: 'Default shortcuts',
    description: 'Permit binding default shortcuts.',
    default: true,
  },
  {
    key: 'custom-shortcuts',
    type: 'object',
    title: 'Custom shortcuts',
    description: 'JSON array of custom shortcuts. See default values for definition format. Reload plugin to apply changes.',
    default: [
      { idx: -1, new: true, bind: 'b b', disabled: true, desc: 'Append and edit' },
      { idx: 0, new: true, bind: 'b p', disabled: true, desc: 'Prepend and edit' },
      { idx: 0, bind: 'b 1', disabled: true, desc: 'Edit block 1' },
      { idx: -1, bind: 'b l', disabled: true, desc: 'Edit last block' },
      { idx: -2, bind: 'b L', disabled: true, desc: 'Edit penultimate block' },
      { idx: 0, bind: 'b f', disabled: true, onlySelect: true,
        desc: 'Experimental option to select the block without editing. May not work reliably.' },

    ],
  },
];


function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


async function blockNav(idx, before, newBlock, onlySelect) {
  const ed = logseq.Editor, app = logseq.App;
  let page = await ed.getCurrentPage();

  if (page === null) {
    page = await ed.getPage(await app.getStateFromStore('today'));
    if (page === null) return;
  }

  let blocks = await ed.getPageBlocksTree(page.name);
  if (blocks === null || blocks.length < 1) return;

  const bidx = idx < 0 ? Math.max(0, blocks.length - Math.abs(idx)) : Math.min(idx, blocks.length - 1);
  let block = blocks[bidx];

  newBlock = newBlock && !(block.children.length < 1 && block.content === '');
  if (newBlock) {
    block = await ed.insertBlock(block.uuid, '', {
      before: before === true, isPageBlock: false, sibling: true
    });
  }

  await ed.editBlock(block.uuid);

  if (onlySelect) await delay(75).then(() => ed.exitEditingMode(true));
}


function bnavBind(opts) {
  if (opts.disabled) return;
  return logseq.App.registerCommandPalette({
    key: `blocknav-${opts.id}`,
    keybinding: { binding: opts.bind, mode: 'non-editing' },
    label: `Blocknav: ${opts.desc}`,
    palette: opts.noPalette !== true,
  }, () => blockNav(opts.idx, opts.idx >= 0, opts.new === true, opts.onlySelect === true));
}


function settingsHandler(newSettings, _oldSettings) {
  const custom = newSettings['custom-shortcuts'] || [];

  logseq._execCallableAPI('unregister-plugin-simple-command', logseq.baseInfo.id);
  if (newSettings['default-shortcuts'] !== false)
    DEFAULT_BINDS.forEach(bnavBind);
  custom.forEach((opts, idx) => bnavBind({...opts, id: `custom-${idx}`}));
}


function main () {
  logseq.onSettingsChanged(settingsHandler);
  logseq.useSettingsSchema(SETTINGS_SCHEMA);
}


logseq.ready(main).catch(console.error);
