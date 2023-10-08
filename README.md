# Block Navigation

## Synopsis

Simple plugin to facilitate top-level block navigation in [Logseq](https://www.logseq.com/).

## Installation

1. **(Recommended)** Install from the plugin marketplace.
2. Turn on developer mode in settings and load this repo as an "unpacked plugin" from the Logseq plugins page (`t p`).

## Usage (default keybinds)

Keybind|Action
-|-
`b p`|Prepend empty block and edit
`b b`|Append empty block and edit
`b l`|Edit last block in page
`b 1`|Edit first block in page
…|…
`b 9`|Edit 9th block in page
`b 0`|Edit 10th block in page

**Note 1**: `b p` and `b b` will only prepend/append a new block if the block in that position is not already empty. Entering edit mode will occur in either case.

**Note 2**: If the block to be edited is greater than the number of blocks (i.e. `b 5` when there are 4 blocks) the last block will be edited.

## Settings

The plugin settings page allows disabling the default key bind set and optionally providing your own.

Changing custom keybinds requires editing the plugin JSON settings manually. It currently seems necessary to restart Logseq for the changes to be applied. Also see [Possible Issues](#possible-issues).

### Default Settings JSON

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


### Keybind Ideas

#### Direct Block Indexing

It's possible to dispense with the `b` prefix for keybinds and just use `1` to edit the first block, `- 1` to edit the last, etc. Here is an example using that approach with `^`, `$` to prepend/append blocks (modeled after regex anchors.)

```json
{
  "default-shortcuts": false,
  "custom-shortcuts": [
    { "idx": -1, "new": true, "bind": "shift+4", "desc": "Append and edit" },
    { "idx":  0, "new": true, "bind": "shift+6", "desc": "Prepend and edit" },

    { "idx":  0, "bind": "1",    "desc": "Edit block 1" },
    { "idx":  1, "bind": "2",    "desc": "Edit block 2" },
    { "idx":  2, "bind": "3",    "desc": "Edit block 3" },
    { "idx":  3, "bind": "4",    "desc": "Edit block 4" },
    { "idx":  4, "bind": "5",    "desc": "Edit block 5" },
    { "idx": -1, "bind": "- 1", "desc": "Edit block -1" },
    { "idx": -2, "bind": "- 2", "desc": "Edit block -2" },
    { "idx": -3, "bind": "- 3", "desc": "Edit block -3" },
    { "idx": -4, "bind": "- 4", "desc": "Edit block -4" },
    { "idx": -5, "bind": "- 5", "desc": "Edit block -5" }
  ],
  "disabled": false
}

```


### Possible Issues

Invalid data in the settings JSON file is not currently handled very gracefully. If you've edited the that file and are experiencing problems, it's very likely due to something like a trailing comma in one of the entries causing a JSON syntax error. *Solution: Correct the error and restart Logseq.*
