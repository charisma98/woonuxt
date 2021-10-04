import { gql } from 'nuxt-graphql-request';

export const state = () => ({
  showCart: false,
  itemCount: null,
  products: [],
  productCategories: [],
})


export const mutations = {
  toggleCart: (state, bool) => { state.showCart = bool },
  updateItemCount: (state, itemCount) => (state.itemCount = itemCount),
}

export const actions = {
  async nuxtServerInit ({ dispatch, commit }) {

    console.log('nuxtServerInit');

      const cartQuery = gql`query {
        cart {
          total
          contents {
            itemCount
          }
        }
      }`;

      const { cart } = await this.$graphql.default.request(cartQuery)
      console.log(cart);
      commit("updateItemCount", cart.contents.itemCount);

  },
}