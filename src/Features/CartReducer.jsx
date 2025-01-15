const CartReducer = (state, action) => {
  switch (action.type) {
    case "Add":
      return [...state, action.selectedProduct];

    case "Remove":
      return state.filter((p) => p.id !== action.id);
      

    case "Increase":
      const indexI = state.findIndex((p) => p.id === action.id);
      if (indexI !== -1) {
        state[indexI].quantity += 1;
      }
      return [...state];

    case "Decrease":
      const indexD = state.findIndex((p) => p.id === action.id);
      if (indexD !== -1 && state[indexD].quantity > 1) {
        state[indexD].quantity -= 1;
      }
      return [...state];

    default:
      return state; 
  }
};

export default CartReducer;
