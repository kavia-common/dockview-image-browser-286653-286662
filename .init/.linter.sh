#!/bin/bash
cd /home/kavia/workspace/code-generation/dockview-image-browser-286653-286662/frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

