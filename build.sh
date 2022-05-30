#!env bash
set -euo pipefail
PLUGIN_NAME=${1:-logseq-blocknav}
mkdir "$PLUGIN_NAME"
cd "$PLUGIN_NAME"
cp ../README.md .
sed 's@"\./index\.html"@"./index.js"@' < ../package.json > ./package.json
curl -Ssl 'https://cdn.jsdelivr.net/npm/@logseq/libs@0.0.6' > index.js
cat ../index.js >> ./index.js
cd ..
exec zip -r "$PLUGIN_NAME".zip "$PLUGIN_NAME"
