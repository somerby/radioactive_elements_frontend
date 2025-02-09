import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../api"
import { useSelector } from "react-redux"
import { RootState } from "../store";
import mockElements from '../modules/Mock'

interface elementState {
    element: {
        element_id?: number,
        name: string,
        description: string,
        status: string,
        img_url?: string | null,
        period_time_text: string,
        period_time: number,
        atomic_mass: number
    },
    loading: boolean
}

const initialState: elementState = {
    element: {
        element_id: 0,
        name: '',
        description: '',
        status: '',
        img_url: '',
        period_time_text: '',
        period_time: 0,
        atomic_mass: 0
    },
    loading: false
}

export const getElementWithId = createAsyncThunk(
    'element/getElementWithId',
    async (elementId: string, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.elements.elementsRead(elementId)
            return response.data
        } catch (error: any) {
            const element = mockElements.elements.find((el) => el.element_id.toString() === elementId)
            dispatch(setElementContentAction(element))
            return rejectWithValue("Произошла ошибка")
        }
    }
)

const elementSlice = createSlice({
    name: 'element',
    initialState,
    reducers: {
        setElementContent(state, {payload}) {
            state.element = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getElementWithId.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(getElementWithId.fulfilled, (state, {payload}) => {
            state.loading = false
            state.element = payload!
        }),
        builder.addCase(getElementWithId.rejected, (state) => {
            state.loading = false
        })
    }
})

export const useElement = () => useSelector((state: RootState) => state.element.element)
export const useElementLoading = () => useSelector((state: RootState) => state.element.loading)

export const {
    setElementContent: setElementContentAction
} = elementSlice.actions

export default elementSlice.reducer