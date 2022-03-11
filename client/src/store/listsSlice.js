import { createSlice } from '@reduxjs/toolkit'


let listId = 3;
let _id = 10;

export const listsSlice = createSlice({
    name: 'lists',
    initialState: {

        filter: "all",

        users: [
            {
                userId: 0,
                name: "John",
                email: "userJohn@mail.ru"
            },
            {
                userId: 1,
                name: "Jack",
                email: "userJack@mail.ru"
            },
            {
                userId: 2,
                name: "Nick",
                email: "userNick@mail.ru"
            },

        ],

        lists: [
            {
                name: "Jack",
                email: "user@mail.ru",
                title: "IN PROGRESS",
                listId: 0,
                cards: [
                    {
                        position: 0,
                        listId: 0,
                        id: `card-${0}`,
                        text: "class ",
                        description: "description 1",
                        time: "10.03.2022 21:36"
                    },
                    {
                        position: 1,
                        listId: 0,
                        id: `card-${1}`,
                        text: "created static 2",
                        description: "description 2",
                        time: "10.03.2022 21:36"
                    },
                    {
                        position: 2,
                        listId: 0,
                        id: `card-${2}`,
                        text: "created static 3",
                        description: "description 3",
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
                        position: 0,
                        listId: 1,
                        id: `card-${3}`,
                        text: "created static 1",
                        description: "description 1",
                        time: "10.03.2022 21:36"
                    },
                    {
                        position: 1,
                        listId: 1,
                        id: `card-${4}`,
                        text: "created static 2",
                        description: "description 2",
                        time: "10.03.2022 21:36"
                    },
                    {
                        position: 2,
                        listId: 1,
                        id: `card-${5}`,
                        text: "created static 3",
                        description: "description 3",
                        time: "10.03.2022 21:36"
                    },
                    {
                        position: 3,
                        listId: 1,
                        id: `card-${6}`,
                        text: "created static 4",
                        description: "description 4",
                        time: "10.03.2022 21:36"
                    },
                    {
                        position: 4,
                        listId: 1,
                        id: `card-${7}`,
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
                        position: 0,
                        listId: 2,
                        id: `card-${8}`,
                        text: "created static 6",
                        description: "description 6",
                        time: "10.03.2022 21:36"
                    },
                    {
                        position: 1,
                        listId: 2,
                        id: `card-${9}`,
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

            if (move === "right") {
                console.log(move, "<<<")
                console.log(action.payload.listId)
                const listStart = state.lists[action.payload.listId].cards.splice(action.payload.position, 1)
                const listEnd = listStart.lists[action.payload.listId + 1]
                listEnd.cards.splice(action.payload.listId + 1, 0, ...listEnd)
                // const listStart = state.lists.find((list) => +droppableIdStart === list.listId)
                // const card = listStart.cards.splice(+droppableIndexStart, 1)
            }

            if (type === "list") {
                console.log("list")
                const list = state.lists.splice(+droppableIndexStart, 1);
                state.lists.splice(+droppableIndexEnd, 0, ...list)
            }

            if (droppableIdStart !== droppableIdEnd) {
                console.log("droppableIdStart !== droppableIdEnd")
                const listStart = state.lists.find((list) => +droppableIdStart === list.listId)
                const card = listStart.cards.splice(+droppableIndexStart, 1)
                const listEnd = state.lists.find((list) => +droppableIdEnd === list.listId)
                listEnd.cards.splice(+droppableIndexEnd, 0, ...card)
            }

            if (droppableIdStart !== "all-lists") {
                console.log( droppableIdStart,
                    droppableIdEnd,
                    droppableIndexEnd,
                    droppableIndexStart,)
                const list = state.lists.find((list) => +droppableIdStart === list.listId)
                const card = list.cards.splice(+droppableIndexStart, 1)
                list.cards.splice(+droppableIndexEnd, 0, ...card)
            }
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
            state.lists[action.payload.listId].cards = state.lists[action.payload.listId].cards.map(card => ({
                ...card,
                text: card.id === action.payload.id ? action.payload.text : card.text
            }))
            
        },

        changeCardDesc(state, action) {
            state.lists[action.payload.listId].cards = state.lists[action.payload.listId].cards.map(card => ({
                ...card,
                description: card.id === action.payload.id ? action.payload.desc : card.description
            }))
        },

        changeListTitle(state, action) {
            state.lists[action.payload._id].title = action.payload.titleText
        },

        // sort(state, action) {
        //     const {
                // droppableIdStart,
                // droppableIdEnd,
                // droppableIndexEnd,
                // droppableIndexStart,
                // type
        //     } = action.payload;

            // if (type === "list") {
            //     console.log("list")
            //     const list = state.lists.splice(+droppableIndexStart, 1);
            //     state.lists.splice(+droppableIndexEnd, 0, ...list)
            // }

        //     if (droppableIdStart !== droppableIdEnd) {
        //         console.log("droppableIdStart !== droppableIdEnd")
        //         const listStart = state.lists.find((list) => +droppableIdStart === list.listId)
        //         const card = listStart.cards.splice(+droppableIndexStart, 1)
        //         const listEnd = state.lists.find((list) => +droppableIdEnd === list.listId)
        //         listEnd.cards.splice(+droppableIndexEnd, 0, ...card)
        //     }

        //     if (droppableIdStart !== "all-lists") {
        //         const list = state.lists.find((list) => +droppableIdStart === list.listId)
        //         const card = list.cards.splice(+droppableIndexStart, 1)
        //         list.cards.splice(+droppableIndexEnd, 0, ...card)
        //     }

        // sortRight(state, action) {
        //     console.log("ok")
        //     const {
        //         droppableIdStart,
        //         droppableIdEnd,
        //         droppableIndexEnd,
        //         droppableIndexStart,
        //     } = action.payload;

        //     console.log(
        //         droppableIdStart,
        //         droppableIdEnd,
        //         droppableIndexEnd,
        //         droppableIndexStart
        //         )

        //    if (droppableIdStart !== droppableIdEnd) {
        //         const listStart = state.lists.find((list) => +droppableIdStart === list.listId)
        //         const card = listStart.cards.splice(+droppableIndexStart, 1)
        //         // const listEnd = state.lists.find((list) => +droppableIdEnd === list.listId)
        //         const listEnd = state.lists
        //         listEnd.cards.splice(+droppableIndexEnd, 0, ...card)
        //     }
        // }

    },
})

export const { addList, addCard, sort, changeCardText, changeCardDesc, changeListTitle } = listsSlice.actions
export default listsSlice.reducer;

