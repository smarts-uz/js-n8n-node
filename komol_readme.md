# Komol Node Setup Guide

## Initial Setup

1. Create the node directory structure:
```bash
mkdir -p nodes/KomolNode
```

2. Create the node files:
- `nodes/KomolNode/KomolNode.node.ts` - Main node file
- `nodes/KomolNode/KomolNode.node.json` - Node metadata
- `nodes/KomolNode/KomolNode.svg` - Node icon

## Development Commands

### Build the node
```bash
npm run build
```

### Watch mode for development
```bash
npm run dev
```

### Format code
```bash
npm run format
```

### Lint code
```bash
npm run lint
```

### Fix linting issues
```bash
npm run lintfix
```

## Linking the Node to n8n

1. Create n8n custom directory (if it doesn't exist):
```bash
mkdir -Force $HOME/.n8n/custom
```

2. Link the package:
```bash
# In the node project directory
npm link

# In the n8n custom directory
cd $HOME/.n8n/custom
npm link n8n-nodes-nasapics
```

3. Unlink the package (when needed):
```bash
npm unlink
```

## Fixing Common Issues

### Icon Not Showing
1. Make sure the icon file is named correctly:
```bash
mv nodes/KomolNode/nasapics.svg nodes/KomolNode/KomolNode.svg
```

2. Update the icon path in the node file:
```typescript
icon: 'file:KomolNode.svg'
```

3. Clean and rebuild:
```bash
rm -r -Force dist
npm run build
```

### Directory Structure Issues
1. Rename the directory to match the node name:
```bash
mv nodes/NasaPics nodes/KomolNode
```

2. Update package.json paths:
```json
"nodes": [
  "dist/nodes/KomolNode/KomolNode.node.js"
]
```

### Rebuilding After Changes
```bash
# Clean the dist directory
rm -r -Force dist

# Rebuild
npm run build

# Relink
npm unlink
npm link
cd $HOME/.n8n/custom
npm link n8n-nodes-nasapics
```

## Node Structure

The node consists of:
- `KomolNode.node.ts` - Main node implementation
- `KomolNode.node.json` - Node metadata and documentation
- `KomolNode.svg` - Node icon
- `NasaPicsApi.credentials.ts` - Credentials implementation

## Testing the Node

1. Start n8n:
```bash
n8n start
```

2. The node should appear in the nodes panel as "Komol Node"
3. Test the node by creating a new workflow

## Troubleshooting

If the node doesn't appear:
1. Check if the package is properly linked
2. Verify the build output in the dist directory
3. Check the n8n logs for any errors
4. Make sure all file names match the node name
5. Verify the icon file is valid and in the correct location 
