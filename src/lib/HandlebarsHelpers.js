/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
export default {
  ifEquals (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  },
};

