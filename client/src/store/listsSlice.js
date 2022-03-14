import { createSlice } from '@reduxjs/toolkit'


let listId = 3;
let _id = 10;

export const listsSlice = createSlice({
    name: 'lists',
    initialState: {

        filter: "all",

        // users: [
        //     {
        //         userId: 0,
        //         name: "John",
        //         email: "userJohn@mail.ru"
        //     },
        //     {
        //         userId: 1,
        //         name: "Jack",
        //         email: "userJack@mail.ru"
        //     },
        //     {
        //         userId: 2,
        //         name: "Nick",
        //         email: "userNick@mail.ru"
        //     },
        // ],

        lists: [
            {
                name: "Jack",
                email: "user@mail.ru",
                title: "IN PROGRESS",
                listId: 0,
                cards: [
                    {
                        // position: 0,
                        listId: 0,
                        id: 3724585,
                        text: "class ",
                        description: "description 1",
                        time: "10.03.2022 21:36"
                    },
                    {
                        // position: 1,
                        listId: 0,
                        id: 8757487,
                        text: "created static 2",
                        description: "description 2",
                        time: "10.03.2022 21:36"
                    },
                    {
                        // position: 2,
                        listId: 0,
                        id: 8743098,
                        text: "created static 3",
                        description: "description 3",
                        time: "10.03.2022 21:36"
                    },
                    {
                        // position: 3,
                        listId: 0,
                        id: 87877798,
                        text: "created static 4",
                        description: "description 4",
                        time: "10.03.2022 21:36"
                    },
                ]
            },
            {
                name: "Jack",
                email: "user@mail.ru",
                title: "TO DO",
                listId: 1,
                cards: [
                    {
                        // position: 0,
                        listId: 1,
                        id: 5465765,
                        text: "created static 1",
                        description: "description 1",
                        time: "10.03.2022 21:36"
                    },
                    {
                        // position: 1,
                        listId: 1,
                        id: 21334344,
                        text: "created static 2",
                        description: "description 2",
                        time: "10.03.2022 21:36"
                    },
                    {
                        // position: 2,
                        listId: 1,
                        id: 34656723,
                        text: "created static 3",
                        description: "description 3",
                        time: "10.03.2022 21:36"
                    },
                    {
                        // position: 3,
                        listId: 1,
                        id: 56324235,
                        text: "created static 4",
                        description: "description 4",
                        time: "10.03.2022 21:36"
                    },
                    {
                        // position: 4,
                        listId: 1,
                        id: 2436653,
                        text: "created static 5",
                        description: "description 5",
                        time: "10.03.2022 21:36"
                    }
                ]
            },
            {
                name: "Jack",
                email: "user@mail.ru",
                title: "TO DO2",
                listId: 2,
                cards: [
                    {
                        // position: 0,
                        listId: 2,
                        id: 7654325,
                        text: "created static 6",
                        description: "description 6",
                        time: "10.03.2022 21:36"
                    },
                    {
                        // position: 1,
                        listId: 2,
                        id: 4665734,
                        text: "created static 7",
                        description: "description 7",
                        time: "10.03.2022 21:36"
                    },

                ]
            },
        ]
    },
    reducers: {

        sort(state, action) {
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexEnd,
                droppableIndexStart,
                type,
                move
            } = action.payload;

            if (type === "list") {
                console.log("list")
                const list = state.lists.splice(+droppableIndexStart, 1);
                state.lists.splice(+droppableIndexEnd, 0, ...list)
            }

            if (move === true) {
                const indexCardStart = state.lists[action.payload.indexStart].cards.findIndex(card => card.id === action.payload.id)
                const moveCard = state.lists[action.payload.indexStart].cards.splice(indexCardStart, 1)
                const indexCardEnd = state.lists[action.payload.indexEnd]
                indexCardEnd.cards.splice(0, 0, ...moveCard)
            }

            if (droppableIdStart !== droppableIdEnd) {
                const listStart = state.lists.find((list) => +droppableIdStart === list.listId)
                const card = listStart.cards.splice(+droppableIndexStart, 1)
                const listEnd = state.lists.find((list) => +droppableIdEnd === list.listId)
                listEnd.cards.splice(+droppableIndexEnd, 0, ...card)
            }

            // if (droppableIdStart !== "all-lists" && droppableIdStart !== droppableIndexEnd ) {
            //     console.log("all-lists")
            //     const list = state.lists.find((list) => +droppableIdStart === list.listId)
            //     const card = list.cards.splice(+droppableIndexStart, 1)
            //     list.cards.splice(+droppableIndexEnd, 0, ...card)
            // }

            // if (droppableIdStart !== droppableIdEnd) {
            //     console.log(2, "<<")
            //     console.log(action.payload)
            //     const listStart = state.lists[+action.payload.droppableIdStart]
            //     const card = listStart.cards.splice(+droppableIndexStart, 1)
            //     const listEnd = state.lists[+action.payload.droppableIdEnd]
            //     listEnd.cards.splice(+droppableIndexEnd, 0, ...card)
            // }

            // if (droppableIdStart !== "all-lists" && droppableIdStart !== droppableIndexEnd ) {
            //     console.log(3, "<<")

            //     // const list = state.lists[+action.payload.droppableIdStart]
            //     // const card = list.cards.splice(+droppableIndexStart, 1)
            //     // list.cards.splice(+droppableIndexEnd, 0, ...card)

            //     // const listStart = state.lists[+action.payload.droppableIdStart]
            //     // const card = listStart.cards.splice(+droppableIndexStart, 1)
            //     // const listEnd = state.lists[+action.payload.droppableIdEnd]
            //     // listEnd.cards.splice(+droppableIndexEnd, 0, ...card)
            // }
        },

        addList(state, action) {
            const newList = {
                title: action.payload.text,
                listId: listId,
                cards: []
            }
            listId += 1
            return { ...state, lists: [...state.lists, newList] }
        },

        addCard(state, action) {
            const newCard = {
                listId: action.payload.listId,
                id: `card-${_id}`,
                text: action.payload.text,
                description: action.payload.desc,
                time: action.payload.time
            }
            _id += 1
            const newState = state.lists.map(list => {
                if (list.listId === action.payload._id) {
                    return { ...list, cards: [...list.cards, newCard] }
                }
                else return list
            })
            return { lists: newState }
        },

        changeCardText(state, action) {
            state.lists[action.payload.indexList].cards = state.lists[action.payload.indexList].cards.map(card => ({
                ...card,
                text: card.id === action.payload.id ? action.payload.text : card.text
            }))
            
        },

        changeCardDesc(state, action) {
            state.lists[action.payload.indexList].cards = state.lists[action.payload.indexList].cards.map(card => ({
                ...card,
                description: card.id === action.payload.id ? action.payload.desc : card.description
            }))
        },

        changeListTitle(state, action) {
            state.lists[action.payload._id].title = action.payload.titleText
        },
    },
})

export const { addList, addCard, sort, changeCardText, changeCardDesc, changeListTitle } = listsSlice.actions
export default listsSlice.reducer;

