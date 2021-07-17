import getProducts from '../gql/queries/getProducts'
import getProductCategories from '../gql/queries/getProductCategories'

export const state = () => ({
  showCart: false,
  products: [],
  productCategories: [],
})

export const mutations = {
  updateProducts: (state, products) => {
    state.products = products
  },
  updateCategories: (state, productCategories) => {
    state.productCategories = productCategories
  },
  toggleCart: (state, bool) => {
    state.showCart = bool
  },
}

export const actions = {
  async nuxtServerInit({ state, commit, dispatch }) {
    const { products } = await this.$graphql.default.request(getProducts)
    commit('updateProducts', products.nodes)

    const { productCategories } = await this.$graphql.default.request(
      getProductCategories
    )
    commit('updateCategories', productCategories.nodes)
  },
}
