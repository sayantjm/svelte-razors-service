'use strict';

const { default: createStrapi } = require('strapi');

const stripe = require('stripe')('sk_test_51IAWdVCr7JaRUmLwR4v3HCKVGvBNjJttGmHytzugTYtP2iG9WKigpXeTTySFiWzj8Z0QXuik3iPfFHUbPlr4qgrN00qHP2Qm13');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    create: async ctx => {
        const {name, total, items, stripeTokenId} = ctx.request.body;
        const {id} = ctx.state.user;
        const charge = await stripe.charges.create({
            amount: total * 100,
            currency: 'eur',
            description: `Order ${new Date()} by ${ctx.state.user.username}`,
            source: stripeTokenId
        });

        const order = await strapi.services.order.create({
            name, total,items,user:id
        });
        return order;
    }
};
