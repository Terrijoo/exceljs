"use strict";

const colCache = require('../../../utils/col-cache');
const BaseXform = require('../base-xform');
class AutoFilterXform extends BaseXform {
  get tag() {
    return 'autoFilter';
  }
  render(xmlStream, model) {
    if (model) {
      if (typeof model === 'string') {
        // assume range
        xmlStream.leafNode('autoFilter', {
          ref: model
        });
      } else {
        const getAddress = function (addr) {
          if (typeof addr === 'string') {
            return addr;
          }
          return colCache.getAddress(addr.row, addr.column).address;
        };
        const firstAddress = getAddress(model.from);
        const secondAddress = getAddress(model.to);
        if (firstAddress && secondAddress) {
          xmlStream.leafNode('autoFilter', {
            ref: "".concat(firstAddress, ":").concat(secondAddress)
          });
        }
      }
    }
  }
  parseOpen(node) {
    if (node.name === 'autoFilter') {
      this.model = node.attributes.ref;
    }
  }
}
module.exports = AutoFilterXform;
//# sourceMappingURL=auto-filter-xform.js.map
