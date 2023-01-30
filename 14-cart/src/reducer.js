const reducer = (state, action) => {
     switch (action.type) {
          case 'CLEAR_CART':
               return {
                    ...state,
                    cart: []
               }
          case 'REMOVE':
               return {
                    ...state,
                    cart: state.cart.filter(item => {
                         return item.id !== action.payload
                    })
               }
          case 'TOGGLE_AMOUNT': 
               return {
                    ...state,
                    cart: state.cart.map(cartItem => {
                    if (cartItem.id === action.payload.id) {
                         if(action.payload.type === 'inc'){
                              return {
                                   ...cartItem,
                                   amount: cartItem.amount++
                              }
                         }
                         if(action.payload.type === 'dec'){
                              return {
                                   ...cartItem,
                                   amount: cartItem.amount--
                              }
                         }
                    }
                    else {
                         return cartItem
                    }
               }).filter(cartItem => cartItem.amount !== 0)
               }
          case 'GET_TOTALS':
               let {total, amount} = state.cart.reduce((cartTotal, cartItem)=>{
                    const {price, amount} = cartItem;
                    const itemTotal = price * amount;
                    cartTotal.amount += amount;
                    cartTotal.total += itemTotal
                    return cartTotal
               },{
                    total: 0,
                    amount: 0
               })
               total = parseFloat(total.toFixed(2))

               return {
                    ...state,
                    total,
                    amount
               }
          case 'LOADING':
               return {
                    ...state,
                    loading: true
               }
          case 'DISPLAY_ITEMS':
               return {
                    ...state,
                    cart: action.payload,
                    loading: false
               }
          default:
               return state;
     }
}

export default reducer;