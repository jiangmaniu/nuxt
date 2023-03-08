import { pathToFileURL } from 'node:url'
import { resolve as importMetaResolve } from 'import-meta-resolve'
import { interopDefault } from 'mlly'

/**
 * Resolve a module from a given root path using an algorithm patterned on
 * the upcoming `import.meta.resolve`. It returns a file URL
 *
 * @internal
 */
export async function tryResolveModule (id: string, root = import.meta.url) {
  if (!root.startsWith('file:')) {
    root = pathToFileURL(root).href
  }
  try {
    return await importMetaResolve(id, root)
  } catch { }
}

export async function importModule (id: string, root = import.meta.url) {
  if (!root.startsWith('file:')) {
    root = pathToFileURL(root).href
  }
  const resolvedPath = await importMetaResolve(id, root)
  return import(resolvedPath).then(interopDefault)
}

export function tryImportModule (id: string, root = import.meta.url) {
  if (!root.startsWith('file:')) {
    root = pathToFileURL(root).href
  }
  try {
    return importModule(id, root).catch(() => undefined)
  } catch { }
}
