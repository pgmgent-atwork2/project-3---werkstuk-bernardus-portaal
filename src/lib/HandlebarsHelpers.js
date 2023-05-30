/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
export default {
  bold: function (text) {
    return `<strong>${text}</strong>`;
  },
  ifEquals (arg1, arg2, options) {
    // eslint-disable-next-line eqeqeq
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  },

  button(type, className, options) {
    return `<button type="${type}" class="${className}">${options.fn(
      this
    )}</button>`;
  },
  modalButton(type, className, data, options) {
    return `<button type="${type}" class="${className}" data-open="${data}">${options.fn(
      this
    )}</button>`;
  },
  admin(role, options) {
    if (role === 'admin') {
      return `${options.fn()}`;
    }
  },
  editor(role, options) {
    if (role === 'editor' || role === 'admin') {
      return `${options.fn()}`;
    }
  },
};
