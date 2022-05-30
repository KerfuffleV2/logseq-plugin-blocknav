# Blocknav

## Synopsis

Super simple plugin to facilitate block navigation in [Logseq](https://www.logseq.com/).

## Installation

Not currently in the marketplace.

To load, must turn on developer mode in settings and load as an "unpacked plugin" from the Logseq plugins page (`t p`).

## Usage (default keybinds)

Keybind|Action
-|-
`b p`|Prepend empty block and edit
`b b`|Append empty block and edit
`b e`|Edit last block in page
`b 1`|Edit first block in page
…|…
`b 9`|Edit 9th block in page
`b 0`|Edit 10th block in page

**Note 1**: `b p` and `b b` will only prepend/append a new block if the block in that position is not already empty. Entering edit mode will occur in either case.

**Note 2**: If the block to be edited is greater than the number of blocks (i.e. `b 5` when there are 4 blocks) the last block will be edited.

## Settings

As of `v0.0.2` the plugin will allow you to disable the default key bindings and optionally provide your own.

Changing custom keybinds requires editing the plugin JSON settings.

### Default settings JSON

```json
{ "default-shortcuts": true,
  "custom-shortcuts": [
    { "idx": -1, "new": true, "bind": "b b", "disabled": true,
      "desc": "Append and edit" },
    { "idx": 0, "new": true, "bind": "b p", "disabled": true,
      "desc": "Prepend and edit" },
    { "idx": 0, "bind": "b 1", "disabled": true,
      "desc": "Edit block 1" },
    { "idx": -1, "bind": "b l", "disabled": true,
      "desc": "Edit last block" },
    { "idx": -2, "bind": "b L", "disabled": true,
      "desc": "Edit penultimate block" },
    { "idx": 0, "bind": "b f", "disabled": true, "onlySelect": true,
      "desc": "Experimental option to select the block without editing. May not work reliably." }
  ],
  "disabled": false }
```

### Custom Shortcut Format

The `custom-shortcuts` config key should be a JSON array consisting of objects with the following keys:

Key|Type|Description
-|-|-
`idx`|number|Block index. The first block is `0` and the last is `-1`. **(required)**
`bind`|string|Logseq style keybind definition. **(required)**
`desc`|string|Description. **(required)**
`disabled`|boolean|Disables this definition. Defaults to `false`. **(optional)**
`new`|boolean|Prepend a block if the index is positive, otherwise append. Defaults to `false`. **(optional)**
`onlySelect`|boolean|**Experimental**: Only select the block, do not edit it. Defaults to `false`. **(optional)**
