import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const dataSlice = createSlice ({
    name: 'data',
    initialState: {
        AtomicMass: '',
    },
    reducers: {
        setAtomicMass(state, {payload}) {
            state.AtomicMass = payload
        }
    }
})

export const useAtomicMass = () => useSelector((state: {ourData: {AtomicMass: string}}) => state.ourData.AtomicMass)

export const {
    setAtomicMass: setAtomicMassAction
} = dataSlice.actions

export default dataSlice.reducer