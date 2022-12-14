const { Schema, model } = require('mongoose');
const Joi = require('joi');

const nameRegExp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const phoneRegExp =
  /^\+?.\(?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
const emailRegExp = /.+@.+..+/i;

const orderSchema = Schema(
  {
    user: {
      name: {
        type: String,
        minlength: 2,
        maxlength: 50,
        match: nameRegExp,
        required: [true, 'Set name for contact'],
      },

      email: {
        type: String,
        match: emailRegExp,
        required: true,
      },

      phone: {
        type: String,
        match: phoneRegExp,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },
    },

    cart: [
      {
        _id: {
          type: String,
          required: true,
        },

        imgUrl: {
          type: String,
        },

        title: {
          type: String,
          required: true,
        },

        descr: {
          type: String,
          required: true,
        },

        category: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
          min: 0.01,
        },

        available: {
          type: Number,
          required: true,
          min: 1,
        },

        shopId: {
          type: String,
          required: true,
        },

        qwantity: {
          type: Number,
          required: true,
          min: 1,
        },

        cost: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
      min: 0.01,
    },
  },

  { versionKey: false, timestamps: true },
);

const joiSchema = Joi.object({
  user: Joi.object({
    name: Joi.string()
      .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
      .required(),

    email: Joi.string()
      .pattern(/.+@.+..+/i)
      .email({
        minDomainSegments: 2,
      })
      .required(),

    phone: Joi.string()
      .pattern(
        /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      )
      .required(),

    address: Joi.string().required(),
  }),

  cart: Joi.array().items(
    Joi.object({
      _id: Joi.string().required(),
      imgUrl: Joi.string().allow('').required(),
      title: Joi.string().required(),
      descr: Joi.string().required(),
      category: Joi.string().required(),
      price: Joi.number().min(0.01).required(),
      available: Joi.number().min(1).required(),
      shopId: Joi.string().required(),
      qwantity: Joi.number().min(1).required(),
      cost: Joi.number().min(1).required(),
    }),
  ),

  totalPrice: Joi.number().min(0.01).required(),
});

const Order = model('order', orderSchema);

module.exports = {
  Order,
  joiSchema,
};
