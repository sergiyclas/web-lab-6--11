const initialState = []


function cartReducer(state = initialState, action) {
    let update = [...state];
    switch (action.type) {
        case "cart/addItem":
            let isExist = state.find(item => item._id === action.payload._id)?._id;

            if (isExist) {
                let update = state.map(item =>
                    item._id !== action.payload._id ? item : {
                        ...item,
                        count: item.count + action.payload.count
                    }
                )

                localStorage.setItem("cart", JSON.stringify(update))
                return update
            } else {
                localStorage.setItem("cart", JSON.stringify([...state, action.payload]))
                return [...state, action.payload]
            }
        case "cart/decrementItem":
            let itemToBeDecremented = state.find(item => item._id === action.payload._id);

            if (itemToBeDecremented.count === 1) {
                let update = state.filter(item => item._id !== action.payload._id)

                localStorage.setItem("cart", JSON.stringify(update))
                return update
            } else {
                let update = state.map(item => item._id !== action.payload._id ? item : {
                    ...item,
                    count: item.count - 1
                })

                localStorage.setItem("cart", JSON.stringify(update))
                return update
            }
        case "cart/incrementItem":
            update = state.map(item => item._id !== action.payload._id ? item : {
                ...item,
                count: item.count + 1
            })

            localStorage.setItem("cart", JSON.stringify(update))
            return update
        case "cart/setCount":
            update = state.map(item => item._id !== action.payload._id ? item : {
                ...item,
                count: action.payload.count
            })

            localStorage.setItem("cart", JSON.stringify(update))
            return update
        case "cart/deleteItem":
            update = state.filter(item => item._id !== action.payload._id)

            localStorage.setItem("cart", JSON.stringify(update))
            return update
        default:
            localStorage.setItem("cart", JSON.stringify(update))
            return update
    }
}

export default cartReducer