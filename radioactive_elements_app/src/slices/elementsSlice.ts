import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { api } from "../api/index";
import mockElements from "../modules/Mock";
import { setDecayInfAction } from "./userSlice";

interface ElementInf {
    element_id: number,
    name: string,
    description: string,
    status: string,
    img_url: string,
    period_time_text: string,
    period_time: number,
    atomic_mass: number
}

interface elementsState {
    elements: ElementInf[],
    atomic_mass: string,
    loading: boolean,
}

const initialState: elementsState = {
    elements: [],
    atomic_mass: '',
    loading: false,
}

export const getElementsWithSearch = createAsyncThunk(
    'elements/getElementsWithSearch',
    async (atomicMass:string, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.elements.elementsList({
                atomic_mass: atomicMass!
            })
            dispatch(setDecayInfAction(response.data.decay_information))
            return response.data
        }catch (error: any){
            dispatch(setDecayInfAction(mockElements.decay_information))
            return rejectWithValue('Ошибка при загрузке данных');
        }
    }
)

export const addElementToDecay = createAsyncThunk(
    'element/addElementToDecay',
    async (elementId: string, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.elements.elementsCreate2(elementId)
            dispatch(setDecayInfAction(response.data.decay_information))
            return response.data
        } catch (error: any) {
            return rejectWithValue("Произошла ошибка")
        }
    }
)

const elementsSlice = createSlice ({
    name: 'elements',
    initialState,
    reducers: {
        setAtomicMass(state, {payload}) {
            state.atomic_mass = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getElementsWithSearch.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(getElementsWithSearch.fulfilled, (state, {payload}) => {
            state.elements = payload.elements;
            state.loading = false;
        }),
        builder.addCase(getElementsWithSearch.rejected, (state) => {
            state.elements = mockElements.elements.filter((el) => el.atomic_mass.toString().includes(state.atomic_mass.toString()))
            state.loading = false;
        })
    }
})

export const useAtomicMass = () => useSelector((state: RootState) => state.elements.atomic_mass)
export const useElementsLoading = () => useSelector((state: RootState) => state.elements.loading)
export const useElements = () => useSelector((state: RootState) => state.elements.elements)

export const {
    setAtomicMass: setAtomicMassAction
} = elementsSlice.actions

export default elementsSlice.reducer