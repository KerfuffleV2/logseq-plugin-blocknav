# Blocknav

## Synopsis

Super simple plugin to facilitate block navigation in [Logseq](https://www.logseq.com/).

## Installation

Not currently in the marketplace.

To load, must turn on developer mode in settings and load as an "unpacked plugin" from the Logseq plugins page (`t p`).

## Usage

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
