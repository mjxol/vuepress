const Option = require('../Option')
const { writeTemp } = require('@vuepress/shared-utils')

module.exports = class ClientDynamicModulesOption extends Option {
  async apply () {
    for (const item of this.items) {
      const { value: fn, name: pluginName } = item
      let modules = await fn()
      if (!Array.isArray(modules)) {
        modules = [modules]
      }
      for (const { name, content, dirname } of modules) {
        await writeTemp(
          `${dirname || 'dynamic'}/${name}`,
          `
/**
 * Generated by "${pluginName}"
 */
${content}\n\n
        `.trim())
      }
    }
  }
}